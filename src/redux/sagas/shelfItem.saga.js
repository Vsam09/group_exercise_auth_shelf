import axios from "axios";
import { takeLatest, put } from 'redux-saga/effects';

function* fetchItem() {
    
  try{
    const items = yield axios.get ('/api/shelf')
    console.log('fetchItem', items)
    yield put({ type: 'SET_ITEM', payload: items.data});
  }
  catch(error) {
      console.log('getItems at shelfItem has error', error)
  }
}

function* addItem(action){
    try{
        //POST to api/movie erver
        yield axios.post('api/shelf', action.payload);
        yield put({
            //Fetch from server
            type: 'FETCH_ITEM'
        })
    } catch (error){
        console.log(error)
    }
}; //end addMovie function

function* fetchItemSaga() {
  yield takeLatest('FETCH_ITEM', fetchItem);
  yield takeLatest('ADD_ITEM', addItem);
}

export default fetchItemSaga;