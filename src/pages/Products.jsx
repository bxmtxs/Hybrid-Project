import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Card,
    Container,
    Table,
    Image,
    Button,
    Modal,
    Form,
    ButtonGroup,
    Row,
    Col
} from "react-bootstrap";
import axios from "axios";

export default function Products() {
    const { type } = useParams();
    // สร้าง state สำหรับเก็บข้อมูลสินค้า
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [product, setProduct] = useState({
        id: 0,
        product_name: "",
        product_price: "",
        product_description: "",
        product_amount: 0,
        product_image: "",
        product_type: "shoe",
    });

    const handleInputChange = (field, value) => {
        setProduct((prevProduct) => ({
            ...prevProduct, // คัดลอกค่าเดิม
            [field]: value, // อัพเดตเฉพาะ field ที ่่ เปลี ่่ ยน
        }))
            ;
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEdit = (obj) => {
        setProduct({
            id: obj.id,
            product_name: obj.product_name || "",
            product_price: obj.product_price || 0,
            product_description: obj.product_description || "",
            product_amount: obj.product_amount || 0,
            product_image: obj.product_image || "",
        });
        setShow(true);
    };

    const resetProductForm = () => {
        setProduct({
            id: 0,
            product_name: "",
            product_price: "",
            product_description: "",
            product_amount: 0,
            product_image: ""
        });
    };

    function listProducts() {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.baserow.io/api/database/rows/table/718149/?user_field_names=true&filter__product_type__equal=${type}`,
            headers: {
                'Authorization': 'Token YUu0pkQ7FjbwpjqALu0gU9Z6MHHXtwRV'
            }
        };

        axios
            .request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setProducts(response.data.results);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
                setLoading(false);
            });
    } // เรียกใช้ฟังก์ชัน listCustomers เมื่อคอมโพเนนต์ถูกโหลด
    useEffect(() => {
        listProducts();
    }, []);

    function createProducts() {
        if (product.product_name.length <= 0) {
            alert("error");
            return false;
        }
        let data = {
            product_name: product.product_name,
            product_price: product.product_price,
            product_description: product.product_description,
            product_amount: product.product_amount,
            product_image: product.product_image,
            product_type: product.product_type,
        };
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: 'https://api.baserow.io/api/database/rows/table/718149/?user_field_names=true',
            headers: {
                'Authorization': 'Token YUu0pkQ7FjbwpjqALu0gU9Z6MHHXtwRV',
            },
            data: data,
        };
        axios
            .request(config)
            .then((response) => {
                // เก็บข้อมูลลูกค้าใน state
                setShow(false);
                listProducts();
                resetProductForm();
            })
            .catch((error) => {
                console.log(error);
                setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
            });
    }

    function updateProducts(row_id) {
        if (product.product_name.length <= 0) {
            alert("error");
            return false;
        }
        let data = {
            product_name: product.product_name,
            product_price: product.product_price,
            product_description: product.product_description,
            product_amount: product.product_amount,
            product_image: product.product_image,
            product_type: product.product_type,
        };
        let config = {
            method: "patch",
            maxBodyLength: Infinity,
            url: 'https://api.baserow.io/api/database/rows/table/718149/?user_field_names=true',
            headers: {
                'Authorization': 'Token YUu0pkQ7FjbwpjqALu0gU9Z6MHHXtwRV',
            },
            data: data,
        };
        axios
            .request(config)
            .then((response) => {
                // เก็บข้อมูลลูกค้าใน state
                setShow(false);
                listProducts();
                resetProductForm();
            })
            .catch((error) => {
                console.log(error);
                setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
            });
    }

    function deleteProduct(row_id, name) {
        const confirmDelete = window.confirm(
            `คุณต้องการลบข้อมูลของ ${name} ใช่หรือไม่?`
        );
        if (!confirmDelete) {
            return false;
        }
        let config = {
            method: "delete",
            maxBodyLength: Infinity,
            url:
                `https://api.baserow.io/api/database/rows/table/XXX/${row_id}/`,
            headers: {
                Authorization: "Token XX",
            },
        };
        axios
            .request(config)
            .then((response) => {
                // เก็บข้อมูลลูกค้าใน state
                setShow(false);
                listProducts();
                resetProductForm();
            })
            .catch((error) => {
                console.log(error);
                setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
            });
    }

    return (<Container className="p-4">
        <div align="center">
            <h1>รายการสินค้า</h1>
        </div>
        <Row>
            <Col>
                <div align="left">
                    <h1>รายการสินค้า : { type=== "shoe" ? "รองเท้า" : "กระเป๋า"}</h1>
                </div>
            </Col>
            <Col>
                <div align="right">
                    <Button
                        variant="primary"
                        onClick={() => [handleShow(),resetProductForm()]}
                    >
                    เพิ่มข้อมูล
                    </Button>
                </div>
            </Col>
        </Row>
        <Row>
            {products.map((rs, index) => (
                <Col sm={12} md={6} lg={3}>
                    <Card>
                        <Card.Img
                            variant="top"
                            src={rs?.product_image}
                            style={{ height: 250 }}
                        />
                        <Card.Body>
                            <Card.Title>{rs?.product_name}</Card.Title>
                            <Card.Text>
                                <div> ราคา {rs?.product_price}</div>
                                <div> จำนวน {rs?.product_amount}</div>
                            </Card.Text>
                            <Button variant="warning" onClick={(e) => handleEdit(rs)}>แก้ไข</Button>
                            <Button variant="danger" onClick={(e) => deleteProduct(rs.id, rs.product_name)}>ลบ</Button>
                        </Card.Body>
                    </Card>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>ฟอร์มข้อมูลสินค้า</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>ชื่อสินค้า</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="ชื่อ"
                                    value={product?.product_name} onChange={(e) => handleInputChange("product_name", e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>ราคา</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="ราคา"
                                    value={product?.product_price} onChange={(e) => handleInputChange("product_price", e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>รายละเอียดสินค้า</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="รายละเอียด"
                                    value={product?.product_description} onChange={(e) => handleInputChange("product_description", e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>จำนวน</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="จำนวน"
                                    value={product?.product_amount} onChange={(e) => handleInputChange("product_amount", e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>รูปสินค้า</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="รูป"
                                    value={product?.product_image} onChange={(e) => handleInputChange("product_image", e.target.value)}
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                ปิด
                            </Button>
                            <Button variant="primary" onClick={() =>
                                product?.id > 0 ? updateProducts(product.id) : createProducts()
                            }
                            >
                                บันทึก
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            ))}
        </Row>
    </Container>)
}