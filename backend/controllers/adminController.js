const XLSX = require("xlsx");
const Certificate = require("../models/certificate");
const User = require("../models/user");
exports.uploadExcel = async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ msg: "No file uploaded" });
        }


        if (!file.originalname.endsWith(".xlsx")) {
            return res.status(400).json({ msg: "Only Excel files allowed" });
        }

        //  Read Excel
        const workbook = XLSX.read(file.buffer, { type: "buffer" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet, { raw: false });

        const parseDate = (value) => {
            if (!value) return null;

            // If already Date object
            if (value instanceof Date) return value;

            // If format is DD-MM-YYYY
            const parts = value.split("-");
            if (parts.length === 3) {
                return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
            }

            return new Date(value);
        };

        const certificates = data
            .filter((row) => row.Name && row.Email && row.CertificateId && row.Domain && row.IssueDate && row.StartDate && row.EndDate)
            .map((row) => ({
                name: row.Name.trim(),
                email: row.Email.trim(),
                domain: row.Domain?.trim(),
                certificateId: row.CertificateId.toUpperCase().trim(),

                issueDate: parseDate(row.IssueDate),
                startDate: parseDate(row.StartDate),
                endDate: parseDate(row.EndDate)
            }));

        let inserted = 0;
        let updated = 0;

        for (let certificate of certificates) {
            const existing = await Certificate.findOne({
                certificateId: certificate.certificateId,
            });

            if (!existing) {

                // Find user using email
                const existingUser = await User.findOne({
                    email: certificate.email
                });

                await Certificate.create({
                    ...certificate,

                    // If user exists → store user id
                    // else → store null
                    user: existingUser ? existingUser._id : null,
                });

                inserted++;

            } else {
                // Check if data actually changed
                const isDifferent =
                    existing.name !== certificate.name ||
                    existing.email !== certificate.email ||
                    existing.domain !== certificate.domain ||
                    existing.issueDate.toISOString() !== certificate.issueDate.toISOString() ||
                    existing.startDate.toISOString() !== certificate.startDate.toISOString() ||
                    existing.endDate.toISOString() !== certificate.endDate.toISOString()

                if (isDifferent) {
                    //  Update only if changed
                    await Certificate.updateOne(
                        { certificateId: certificate.certificateId },
                        { $set: certificate }
                    );
                    updated++;
                }
            }
        }

        res.json({
            msg: "Upload completed",
            inserted,
            updated,
            total: certificates.length,
        });

    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};