import Joi from 'joi';

export const createHrOperationSchema = Joi.object({
    employee_id: Joi.number().integer().required(),
    department_id: Joi.number().integer().optional().allow(null),
    position_id: Joi.number().integer().optional().allow(null),
    salary_amount: Joi.number().optional().allow(null),
    operation_type: Joi.string().max(32).required(),
    user_id: Joi.number().integer().required(),
    performed_at: Joi.string().isoDate().required(),
    comment: Joi.string().max(500).required(),
});

export const updateHrOperationSchema = Joi.object({
    employee_id: Joi.number().integer().optional(),
    department_id: Joi.number().integer().optional().allow(null),
    position_id: Joi.number().integer().optional().allow(null),
    salary_amount: Joi.number().optional().allow(null),
    operation_type: Joi.string().max(32).optional(),
    user_id: Joi.number().integer().optional(),
    performed_at: Joi.string().isoDate().optional(),
    comment: Joi.string().max(500).optional(),
});
