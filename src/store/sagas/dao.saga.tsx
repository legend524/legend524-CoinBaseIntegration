import {
	call,
	put,
	takeLatest
} from 'redux-saga/effects';
import * as actionTypes from 'store/actionTypes';
import { get as _get } from 'lodash';
import { loadDAOListService, loadDAOService, updateDAOService, addDAOMemberService, addSingleMemberService, addMultiMemberService, editDaoMemberService, updateDaoMembersService } from 'store/services/dao';

function* loadDAOListSaga() {
	try {
		yield put({ type: actionTypes.LOAD_DAOLIST_LOADING, payload: true })
		const { data } = yield call(loadDAOListService)
		console.log('json, response', data)
		yield put({ type: actionTypes.LOAD_DAOLIST_LOADING, payload: false })
		yield put({ type: actionTypes.LOAD_DAOLIST_SUCCESS, payload: data })
	} catch (e) {
		console.log(e)
		yield put({ type: actionTypes.LOAD_DAOLIST_LOADING, payload: false })
	}
}

function* loadDAOSaga(action: any) {
	try {
		yield put({ type: actionTypes.LOAD_DAO_LOADING, payload: true })
		const { data } = yield call(loadDAOService, action.payload)
		console.log('json, response', data)
		yield put({ type: actionTypes.LOAD_DAO_LOADING, payload: false })
		yield put({ type: actionTypes.LOAD_DAO_SUCCESS, payload: data })
	} catch (e) {
		console.log(e)
		yield put({ type: actionTypes.LOAD_DAOLIST_LOADING, payload: false })
	}
}

function* updateDAOSaga(action: any) {
	try {
		yield put({ type: actionTypes.UPDATE_DAO_LOADING, payload: true })
		const { data } = yield call(updateDAOService, action.payload)
		console.log('json, response', data)
		yield put({ type: actionTypes.UPDATE_DAO_LOADING, payload: false })
		yield call(() => new Promise(resolve => setTimeout(resolve, 200)))
		yield put({ type: actionTypes.LOAD_DAO_SUCCESS, payload: data })
		yield put({ type: actionTypes.UPDATE_DAO_LOADING, payload: null })
	} catch (e) {
		console.log(e)
		yield put({ type: actionTypes.UPDATE_DAO_LOADING, payload: null })
	}
}


function* addDAOMemberSaga(action: any) {
	try {
		const { data } = yield call(addDAOMemberService, action.payload)
		console.log('json, response', data)
		yield put({ type: actionTypes.UPDATE_DAO_LOADING, payload: false })
		yield put({ type: actionTypes.LOAD_DAO_SUCCESS, payload: data })
	} catch (e) {
		console.log(e)
	}
}

function* addSingleMemberSaga(action: any) {
	try {
		yield put({ type: actionTypes.ADD_SINGLE_MEMBER_LOADING, payload: true })
		const { data } = yield call(addSingleMemberService, action.payload)
		yield put({ type: actionTypes.SET_DAO_ACTION, payload: data })
		yield put({ type: actionTypes.ADD_SINGLE_MEMBER_LOADING, payload: false })
		yield call(() => new Promise(resolve => setTimeout(resolve, 200)))
		yield put({ type: actionTypes.ADD_SINGLE_MEMBER_LOADING, payload: null })
	} catch (e) {
		yield put({ type: actionTypes.ADD_SINGLE_MEMBER_LOADING, payload: null })
	}
}

function* addMultiMemberSaga(action: any) {
	try {
		yield put({ type: actionTypes.ADD_MULTI_MEMBER_LOADING, payload: true })
		const { data } = yield call(addMultiMemberService, action.payload)
		yield put({ type: actionTypes.SET_DAO_ACTION, payload: data })
		yield put({ type: actionTypes.ADD_MULTI_MEMBER_LOADING, payload: false })
		yield call(() => new Promise(resolve => setTimeout(resolve, 200)))
		yield put({ type: actionTypes.ADD_MULTI_MEMBER_LOADING, payload: null })
	} catch (e) {
		yield put({ type: actionTypes.ADD_MULTI_MEMBER_LOADING, payload: null })
	}
}

function* editDaoMemberSaga(action: any) {
	try {
		yield put({ type: actionTypes.EDIT_DAO_MEMBER_LOADING, payload: true })
		const { data } = yield call(editDaoMemberService, action.payload)
		yield put({ type: actionTypes.SET_DAO_MEMBER_ACTION, payload: data })
		yield put({ type: actionTypes.EDIT_DAO_MEMBER_LOADING, payload: false })
		yield call(() => new Promise(resolve => setTimeout(resolve, 200)))
		yield put({ type: actionTypes.EDIT_DAO_MEMBER_LOADING, payload: null })
	} catch (e) {
		yield put({ type: actionTypes.EDIT_DAO_MEMBER_LOADING, payload: null })
	}
}

function* updateDaoMembersSaga(action: any) {
	try {
		yield put({ type: actionTypes.UPDATE_DAO_MEMBERS_LOADING, payload: true })
		const { data } = yield call(updateDaoMembersService, action.payload)
		yield put({ type: actionTypes.SET_DAO_ACTION, payload: data })
		yield put({ type: actionTypes.UPDATE_DAO_MEMBERS_LOADING, payload: false })
		yield call(() => new Promise(resolve => setTimeout(resolve, 200)))
		yield put({ type: actionTypes.UPDATE_DAO_MEMBERS_LOADING, payload: null })
	} catch (e) {
		yield put({ type: actionTypes.UPDATE_DAO_MEMBERS_LOADING, payload: null })
	}
}

export default function* daoSaga() {
	yield takeLatest(actionTypes.LOAD_DAOLIST_ACTION, loadDAOListSaga)
	yield takeLatest(actionTypes.LOAD_DAO_ACTION, loadDAOSaga)
	yield takeLatest(actionTypes.UPDATE_DAO_ACTION, updateDAOSaga)
	yield takeLatest(actionTypes.ADD_DAO_MEMBER_ACTION, addDAOMemberSaga)
	yield takeLatest(actionTypes.ADD_SINGLE_MEMBER_ACTION, addSingleMemberSaga)
	yield takeLatest(actionTypes.ADD_MULTI_MEMBER_ACTION, addMultiMemberSaga)
	yield takeLatest(actionTypes.EDIT_DAO_MEMBER_ACTION, editDaoMemberSaga)
	yield takeLatest(actionTypes.UPDATE_DAO_MEMBERS_ACTION, updateDaoMembersSaga)
}