import Joi from 'joi';

export const createUserSchema = Joi.object({
    last_name: Joi.string().max(50).required(),
    first_name: Joi.string().max(50).required(),
    patronymic: Joi.string().max(50).optional(),
    login: Joi.string().max(50).required(),
    password: Joi.string().min(6).required(),
    role_id: Joi.number().integer().required(),
});

export const updateUserSchema = Joi.object({
    last_name: Joi.string().max(50).optional(),
    first_name: Joi.string().max(50).optional(),
    patronymic: Joi.string().max(50).optional(),
    login: Joi.string().max(50).optional(),
    password: Joi.string().min(6).optional(),
    role_id: Joi.number().integer().optional(),
});
