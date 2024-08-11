export type ResponseObject = {
	error: string | null;
	code: string;
	message: string;
	data?: Record<string, any>;
};
