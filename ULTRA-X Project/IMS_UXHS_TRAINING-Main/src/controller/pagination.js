/**
 * @author Md. Ariful Islam,
 * Software Engineer,
 * Ultra-X BD Ltd.
 *
 * @copyright All right reserved Ultra-X Asia Pacific
 * 
 * @description get data from database and paginate these data.
 * 
 */
const createPagination = (req, res, next) => {
	const _itemsPerPage = req.body.itemsPerPage
	const _currentPageNumber = req.body.currentPageNumber
	const itemsPerPageDefault = 5;
	const currentPageNumberDefault = 0;
	const errors = [];

	if (isNaN(_itemsPerPage)) {
		errors.push("itemsPerPage must be a integer value")
	}
	if (isNaN(_currentPageNumber)) {
		errors.push("currentPageNumber must be a integer value")
	}
	const itemsPerPage = parseInt(_itemsPerPage);
	const currentPageNumber = parseInt(_currentPageNumber);

	if (itemsPerPage < 0) {
		errors.push("itemsPerPage must be a positive integer value")
	}
	if (currentPageNumber < 0) {
		errors.push("currentPageNumber must be a positive integer value")
	}

	if (errors.length >= 1) {
		return res.status(406).send({
			status: "failed",
			message: "invalid-pagination-data",
			errors
		});
	}

	const paginationData = {
		itemsPerPage: itemsPerPage || itemsPerPageDefault,
		currentPageNumber: currentPageNumber || currentPageNumberDefault
	}
	req.body.paginationData = ({
		...paginationData,
		offset: paginationData.itemsPerPage * paginationData.currentPageNumber
	});
	next();

}
module.exports = {
	createPagination
}