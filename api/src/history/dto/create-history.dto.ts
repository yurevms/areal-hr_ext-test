export class CreateHistoryDto {
    user_id: number;
    entity_type: string;
    entity_id: number;
    field_name: string;
    old_value?: string;
    new_value?: string;
}
