export interface Employee {
    id: number;

    last_name: string;
    first_name: string;
    patronymic: string | null;

    birth_date: string;

    pasport_series: string;
    pasport_number: string;
    pasport_date_of_issue: string;
    pasport_unit_code: string;
    pasport_issued_by: string;

    address_area: string;
    address_city: string;
    address_street: string;
    address_house: string;
    address_building: string | null;
    address_apartment: string | null;

    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
}