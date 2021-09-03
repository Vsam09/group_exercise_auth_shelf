import axios from "axios";
import { put } from 'redux-saga/effects';

function* fetchItem() {
    
  try{
    const items = yield axios.get ('/api/shelf')
    yield put({ type: 'SET_ITEM', payload: items.data});
  }
  catch(error) {
      console.log('getItems at shelfItem has error', error)
  }
}
export default fetchItem;