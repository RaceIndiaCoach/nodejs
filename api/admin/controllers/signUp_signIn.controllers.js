const signUpSignInService = require('../services/signUp_signIn.services');

exports.register = (req, res) => {
    try {
        let data = {};
        data.body = req.body;
        signUpSignInService.registerService(data, (error, result) => {
            if (error) {
                return res.status(400).json({
                    message: 'Bad request',
                    data: error.toString(),
                    status_code: 400
                });
            }
            return res.status(201).json(result);
        });
    } catch (error) {
        res.status(500).json({
            message: error.toString(),
            data: [],
            status_code: 500
        });
    }
}

exports.login = (req, res) => {
    try {
        let data = {};
        data.body = req.body;
        signUpSignInService.loginService(data, (error, result) => {
            if (error) {
                return res.status(400).json({
                    message: 'Bad request',
                    data: error.toString(),
                    status_code: 400
                });
            }
            return res.status(201).json(result);
        });
    } catch (error) {
        res.status(500).json({
            message: error.toString(),
            data: [],
            status_code: 500
        });
    }
}

exports.forgotPasswordSendOTP = (req, res) => {
    try {
        let data = {};
        data.body = req.body;
        signUpSignInService.forgotPasswordSendOTPService(data, (error, result) => {
            if (error) {
                return res.status(400).json({
                    message: 'Bad request',
                    data: error.toString(),
                    status_code: 400
                });
            }
            return res.status(201).json(result);
        });
    } catch (error) {
        res.status(500).json({
            message: error.toString(),
            data: [],
            status_code: 500
        });
    }
}

exports.OTPmatch = (req, res) => {
    try {
        let data = {};
        data.body = req.body;
        signUpSignInService.OTPmatchService(data, (error, result) => {
            if (error) {
                return res.status(400).json({
                    message: 'Bad request',
                    data: error.toString(),
                    status_code: 400
                });
            }
            return res.status(201).json(result);
        });
    } catch (error) {
        res.status(500).json({
            message: error.toString(),
            data: [],
            status_code: 500
        });
    }
}

exports.forgotPasswordUpdate = (req, res) => {
    try {
        let data = {};
        data.body = req.body;
        signUpSignInService.forgotPasswordUpdateService(data, (error, result) => {
            if (error) {
                return res.status(400).json({
                    message: 'Bad request',
                    data: error.toString(),
                    status_code: 400
                });
            }
            return res.status(201).json(result);
        });
    } catch (error) {
        res.status(500).json({
            message: error.toString(),
            data: [],
            status_code: 500
        });
    }
}