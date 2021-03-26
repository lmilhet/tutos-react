function ProductRow({productName, productPrice, stocked}) {
    const stockClass = true === stocked ? 'stocked' : 'non-stocked' 
    return (
        <div className="row">
            <div className={`col-md-6 ${stockClass}`}>{productName}</div>
            <div className="col-md-6">${productPrice}</div>
        </div>
    )
}

function ProductCategoryRow({productCateegoryName}) {
    return (
        <div className="row">
            <div className="col-md-12">
                {productCateegoryName}
            </div>
        </div>
    )
}

function ProductTable() {
    return (
        <div className="product-table-container" style="width: 800px; margin: auto;">
            <div className="row">
                <div className="col-md-6">Name</div>
                <div className="col-md-6">Price</div>
            </div>
            <ProductCategoryRow productCateegoryName={'Sporting goods'}/>
            <ProductRow productName={"football"} productPrice={50.00} stocked={true}/>
            <ProductRow productName={"basketball"} productPrice={39.99} stocked={false}/>
        </div>
    )
}

class FilterableProductTable extends React.Component {
    render () {
        return (
            <div className="container">
                <ProductTable/>
            </div>
        )
    }
}

ReactDOM.render(<FilterableProductTable/>, document.querySelector("#app-container"))