function hasNull(...datas: any[]) {
	datas.forEach((v) => {
		if (!v) return true;
	});

	return false;
}

export { hasNull };
