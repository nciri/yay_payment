const Report = require('../models/reportModel');

const reportController = {
    createReport: async (req, res) => {
        try {
            const report = await Report.createReport(req.body);
            res.status(201).json(report);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getReportsByUserId: async (req, res) => {
        try {
            const reports = await Report.getReportsByUserId(req.params.id);
            res.status(200).json(reports);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = reportController;
