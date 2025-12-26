import Joi from 'joi';

export const createEmployeeFileSchema = Joi.object({
    employee_id: Joi.number().integer().required(),
    file_id: Joi.number().integer().required(),
    file_type: Joi.string().valid('passport_scan', 'contract', 'other').required(),
});

export const updateEmployeeFileSchema = Joi.object({
    employee_id: Joi.number().integer().optional(),
    file_id: Joi.number().integer().optional(),
    file_type: Joi.string().valid('passport_scan', 'contract', 'other').optional(),
});
