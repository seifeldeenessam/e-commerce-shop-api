export type AuthLoginPayload = {
	username: string;
	password: string;
};

export type UserCreatePayload = {
	name: string;
	username: string;
	password: string;
	role: 'ADMIN' | 'SALES_MANAGER' | 'SALES_PERSON';
};
