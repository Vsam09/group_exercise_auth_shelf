import React, {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function ShelfPage() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const shelfItem = useSelector(store => store.shelfItem)

  useEffect(() => {
    dispatch({
      type: 'FETCH_ITEM'
    })
  }, []);

  let itemTemplate = {
    description: '',
    image_url: ''
  };
  
  const [item, setItem] = useState(itemTemplate)
  
  const handlechange = (event) =>{
    setItem({...item, [event.target.name]:event.target.value })
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: 'ADD_ITEM', // need to complete
      payload: item
    });
    //setItem(itemTemplate);
  }

  return (
    <div className="container">
      <h2>Shelf</h2>
      <form onSubmit={handleSubmit}>
        <input 
          name="description"
          type="text"
          placeholder="description"
          value={user.description}
          onChange={handlechange}
        />
        <input 
          name="image_url"
          type="text"
          placeholder="image url"
          value={user.image_url}
          onChange={handlechange}
        />
        <button type="submit">Add Item</button>
      </form>
      <p>All of the available items can be seen here.</p>
      {shelfItem.map(items => (
        <>
      ))}
    </div>
  );
}

export default ShelfPage;
