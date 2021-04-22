const PRODUCTS = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

const ProductRow = React.memo(function ProductRow({product}) {
    console.log('render product row')
    const name = true === product.stocked ? product.name : <span className="text-danger">{product.name}</span> 
    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    )
})

const ProductCategoryRow = React.memo(function ProductCategoryRow({productCategoryName}) {
    console.log('render product category')
    return (
        <tr>
            <th colSpan="2">{productCategoryName}</th>
        </tr>
    )
})

function ProductTable({products, filterText, inStockOnly}) {
    let lastCategory = '';
    let rows = []
    products.forEach((product) => {
        if ((!inStockOnly || product.stocked) && product.name.toLowerCase().startsWith(filterText.toLowerCase())) {
            if (product.category !== lastCategory) {
                lastCategory = product.category
                rows.push(<ProductCategoryRow key={lastCategory} productCategoryName={lastCategory}/>)
            }
            rows.push(<ProductRow key={product.name} product={product}/>)
        }
    })
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleStockOnlyChange = this.handleStockOnlyChange.bind(this)
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value)
    }

    handleStockOnlyChange(e) {
        this.props.onStockChange(e.target.checked)
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <input type="text" className="form-control" value={this.props.filterText} onChange={this.handleFilterTextChange}/>
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="stock" value={this.props.inStockOnly} onChange={this.handleStockOnlyChange}/>
                    <label htmlFor="stock" className="form-check-label">Produit en stock uniquement</label>
                </div>
            </div>
        )
    }
}

class FilterableProductTable extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            filterText: '',
            inStockOnly: false
        }
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleStockOnlyChange = this.handleStockOnlyChange.bind(this)
    }

    handleFilterTextChange(filterText) {
        this.setState({filterText})
    }

    handleStockOnlyChange(inStockOnly) {
        this.setState({inStockOnly})
    }

    render () {
        return <React.Fragment>
            <SearchBar
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
                onFilterTextChange={this.handleFilterTextChange}
                onStockChange={this.handleStockOnlyChange}
            />
            <ProductTable
                products={this.props.products} 
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}/>
        </React.Fragment>
    }
}

ReactDOM.render(<FilterableProductTable products={PRODUCTS}/>, document.querySelector("#app-container"))