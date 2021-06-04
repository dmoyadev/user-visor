import UsersAPI from "@/api/UsersAPI";

const apis = {
	users: UsersAPI,
};

export const APIFactory = {
	get: (name) => apis[name]
};
