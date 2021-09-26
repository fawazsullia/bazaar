import { Link } from 'react-router-dom'
import * as productStyle from './styles/product.module.css'

function Product({product}) {

    return (
        <div className={productStyle.container}>
           <p className={productStyle.view}> <Link to={`/product/${product.id}`} style={{textDecoration : "none", color : "inherit"}}>View Product</Link></p>
          <img src={product.image} className={productStyle.image} />
          <p className={productStyle.price}>$ {product.price}</p>  
          <p className={productStyle.title}>{product.title}</p>  
            <button onClick={()=> {console.log("clicked product button")}} className={productStyle.button}>Add to cart</button>
        </div>
    )
}

export default Product
