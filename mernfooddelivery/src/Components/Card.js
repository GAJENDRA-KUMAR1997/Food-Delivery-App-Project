import React, { useEffect, useRef, useState } from 'react';
import { useCart,useDispatchCart } from './ContextReducer';

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  let options = props.options[0];
  const priceRef = useRef();
  let priceOption = Object.keys(options);
  const [qty,setQty] = useState(1);
  const [size,setSize] = useState("");
  const handleCart = async() =>{
    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    console.log(food)
    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "Add", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }
    await dispatch({type:"Add",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size});
  }
  let finalPrice = qty * parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value);
  },[])
  return (
    <>
     <div className="card mt-3" style={{ width: "18rem" , "maxHeight" : "360px"}}>
          <img src={props.foodItem.img} alt='....' style={{height:"150px" , objectFit:"fill"}}/>
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <div className="container w-100">
              <select className="m-2 h-100  bg-success" onChange={(e)=>setQty(e.target.value)}>
                {
                  Array.from(Array(10),(e,i)=>{
                    return(
                      <option key={i+1} value={i+1}>{i+1}</option>
                    )
                  })
                }
              </select>
              <select className="m-2 h-100  bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                {
                  priceOption.map((data)=>{
                    return (
                      <option key={data} value={data}>{data}</option>
                    )
                  })
                }
              </select>

              <div className="d-inline h-100">
                {finalPrice}
              </div>
              <hr></hr>
              <button className='btn btn-success justify-content-center ms-2' onClick={handleCart}>Add to Cart</button>
            </div>
          </div>
        </div> 
    </>
  )
}
