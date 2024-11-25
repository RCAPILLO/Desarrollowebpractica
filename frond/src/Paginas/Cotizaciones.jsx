import React, { useState, useEffect } from 'react';
import '../Estilos/Paginas/Cotizar.css';
import { useNavigate } from 'react-router-dom';

const Cotizar = () => {
  const [products, setProducts] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]); // Para almacenar productos desde la API
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    id_producto: '',
    name: '',
    unidamedida: '',
    price: '',
    quantity: 1,
    subtotal: 0,
  });

  const [quoteDetails, setQuoteDetails] = useState({
    quoteNumber: '',
    clientId: '',
    id_usuario: '',
    currency: 'USD',
    date: new Date().toISOString().split('T')[0],
  });

  // Obtener productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/cotizar_productos');
        const data = await response.json();
        setAvailableProducts(data); // Guardar productos disponibles
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
    fetchProducts();
  }, []);

  // Agregar producto a la lista de cotización
  const handleAddProduct = () => {
    const subtotal = newProduct.price * newProduct.quantity;
    setProducts([...products, { ...newProduct, subtotal }]);
    setNewProduct({
      id_producto: '',
      name: '',
      unidamedida: '',
      price: '',
      quantity: 1,
      subtotal: 0,
    });
  };

  // Actualizar el campo del nuevo producto
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Si el campo cambiado es "id_producto", buscar los detalles del producto seleccionado
    if (name === 'id_producto') {
      const selectedProduct = availableProducts.find((p) => p.id_producto === value);
      setNewProduct({
        ...newProduct,
        id_producto: value,
        name: selectedProduct ? selectedProduct.nombre : "",
        unidamedida: selectedProduct ? selectedProduct.unidad_medida : "",
      });
    } else {
      // Actualizar otros campos normalmente
      setNewProduct({ ...newProduct, [name]: value });
    }
    console.log('Producto seleccionado:', newProduct);
  };

  // Actualizar campos de detalles de la cotización
  const handleQuoteDetailsChange = (e) => {
    const { name, value } = e.target;
    setQuoteDetails({ ...quoteDetails, [name]: value });
  };

  // Incrementar la cantidad de un producto específico
  const handleIncrementQuantity = (index) => {
    const updatedProducts = products.map((product, i) =>
      i === index
        ? {
          ...product,
          quantity: product.quantity + 1,
          subtotal: product.price * (product.quantity + 1),
        }
        : product
    );
    setProducts(updatedProducts);
  };

  // Disminuir la cantidad de un producto específico
  const handleDisminuirCantidad = (index) => {
    const updatedProducts = products.map((product, i) =>
      i === index && product.quantity > 1
        ? {
          ...product,
          quantity: product.quantity - 1,
          subtotal: product.price * (product.quantity - 1),
        }
        : product
    );
    setProducts(updatedProducts);
  };

  // Eliminar un producto de la cotización
  const handleRemoveProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  // Calcular el subtotal, impuesto y total
  const calculateSubtotal = () => {
    return products.reduce((total, product) => total + product.subtotal, 0);
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.18; // 18% IGV
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    return subtotal + tax;
  };

  // Guardar la cotización
  const handleSaveQuote = async () => {
    const quoteData = {
      id_usuario: quoteDetails.id_usuario,
      id_cliente: quoteDetails.clientId,
      tipo_moneda: quoteDetails.currency,
      productos: products.map((product) => ({
        id_producto: product.id_producto,
        cantidad: product.quantity,
        precio: product.price,
      })),
    };
    console.log('Datos enviados al backend:', JSON.stringify(quoteData, null, 2));
    try {
      const response = await fetch('http://localhost:4000/crearcotizacion', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al guardar la cotización');
      }

      const data = await response.json();
      alert(`Cotización creada con éxito. ID: ${data.id_cotizacion}`);
      setProducts([]);
      setQuoteDetails({
        quoteNumber: '',
        clientId: '',
        currency: 'PEN',
        date: new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      console.error('Error al guardar la cotización:', error);
      alert('Hubo un error al guardar la cotización.');
    }
  };

  // Regresar a página de seguimiento
  const handleBack = () => {
    navigate('/Seguimiento');
  };

  return (
    <div className="contenedor_Principal_Cotizar">
      <div className="contenedor_Secundario_Cotizar">
        <h2>Crear Nueva Cotización</h2>

        {/* Detalles de la cotización */}
        <div>
          <h3>Detalles de la Cotización</h3>
          <input
            type="text"
            name="quoteNumber"
            value={quoteDetails.quoteNumber}
            onChange={handleQuoteDetailsChange}
            placeholder="Número de Cotización"
          />
          <input
            type="text"
            name="clientId"
            value={quoteDetails.clientId}
            onChange={handleQuoteDetailsChange}
            placeholder="ID Cliente"
          />
          <input
            type="text"
            name="id_usuario"
            value={quoteDetails.id_usuario}
            onChange={handleQuoteDetailsChange}
            placeholder="Id de usuario"
          />
          <select
            name="currency"
            value={quoteDetails.currency}
            onChange={handleQuoteDetailsChange}
          >
            <option value="PEN">Soles (PEN)</option>
            <option value="USD">Dólares (USD)</option>
          </select>
          <input
            type="date"
            name="date"
            value={quoteDetails.date}
            onChange={handleQuoteDetailsChange}
          />
        </div>

        {/* Agregar producto o servicios a cotizar desde la base de datos */}
        <div>
          <h3>Agregar Producto</h3>
          <select
            name="id_producto"
            value={newProduct.id_producto}
            onChange={handleInputChange}
          >
            <option value="">Seleccionar producto</option>
            {availableProducts.map((product) => (
              <option key={product.id_producto} value={product.id_producto}>
                {product.nombre}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Precio"
            required
          />
          <input
            type="number"
            name="quantity"
            value={newProduct.quantity}
            onChange={handleInputChange}
            placeholder="Cantidad"
            required
            min="1"
          />
          <button onClick={handleAddProduct}>Agregar Producto</button>
        </div>

        {/* Lista de productos */}
        <div>
          <h3>Productos en la Cotización</h3>
          <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Unidad Medida</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.id_producto}</td>
                    {/* Use the updated name and unit of measure from newProduct */}
                    <td>{newProduct.id_producto === product.id_producto ? newProduct.name : product.nombre}</td>
                    <td>{newProduct.id_producto === product.id_producto ? newProduct.unidamedida : product.unida_medida}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{product.subtotal}</td>
                    <td>
                      <button onClick={() => handleDisminuirCantidad(index)}>-</button>
                      <button onClick={() => handleIncrementQuantity(index)}>+</button>
                      <button onClick={() => handleRemoveProduct(index)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totales */}
        <div>
          <h3>Totales</h3>
          <p>Subtotal: {calculateSubtotal().toFixed(2)}</p>
          <p>Impuesto: {calculateTax(calculateSubtotal()).toFixed(2)}</p>
          <p>Total: {calculateTotal().toFixed(2)}</p>
        </div>

        {/* Botones de acción */}
        <button onClick={handleSaveQuote}>Guardar Cotización</button>
        <button onClick={handleBack}>Regresar</button>
      </div>
    </div>
  );
};

export default Cotizar;
