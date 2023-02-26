function validateNull(...datas: any[]) {
	datas.forEach((v) => {
		if (!v) return false;
	});

	return true;
}

export { validateNull };
