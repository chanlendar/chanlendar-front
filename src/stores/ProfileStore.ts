import { action, computed, makeObservable, observable } from "mobx";

export default class ProfileStore {
	constructor() {
		makeObservable(this, {
			email: observable,
			name: observable,
			uid: observable,
			setProfile: action,
		});
	}

	email: string = "";
	name: string = "";
	uid: string = "";

	setProfile(email: string, name: string, uid: string) {
		this.email = email;
		this.name = name;
		this.uid = uid;
	}

	// 처음에 켜지면 쿠키 찾아서 값업데이트함
}
