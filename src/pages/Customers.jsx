import React, { useEffect, useState } from 'react';
import { Card, Table, Container, Image, Button, Modal, Form, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';
export default function Customers() {

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [customer, setCustomer] = useState({
    "first_name": "",
    "last_name": "",
    "phone": "",
    "email": "",
    "avartar": "",
    "birthday": "",
    "address": ""
  });

  //Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (field, value) => {
    setCustomer((prevCustomer) => ({
      ...prevCustomer, // คัดลอกค่าเดิม
      [field]: value, // อัพเดตเฉพาะ field ที ่่ เปลี ่่ ยน
    }));
  };

  // เพิ่มฟังก์ชันส าหรับการแก้ไขข้อมูลลูกค้า
  const handleEdit = (selectedCustomer) => {
    setCustomer({
      id: selectedCustomer.id,
      first_name: selectedCustomer.first_name || "",
      last_name: selectedCustomer.last_name || "",
      phone: selectedCustomer.phone || "",
      email: selectedCustomer.email || "",
      avartar: selectedCustomer.avartar || "",
      birthday: selectedCustomer.birthday || "",
      address: selectedCustomer.address || "",
    });
    setShow(true);
  };

  // เพิ่มฟังก์ชันรีเซ็ต state customer
  const resetCustomerForm = () => {
    setCustomer({
      id: 0,
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      avartar: "",
      birthday: "",
      address: "",
    });
  };

  function listCustomers() {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.baserow.io/api/database/rows/table/709110/?user_field_names=true',
      headers: {
        'Authorization': 'Token YUu0pkQ7FjbwpjqALu0gU9Z6MHHXtwRV'
      }
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setCustomers(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
        setLoading(false);
      });
  } // เรียกใช้ฟังก์ชัน listCustomers เมื่อคอมโพเนนต์ถูกโหลด
  useEffect(() => {
    listCustomers();
  }, []);

  function createCustomers() {
    //ป้องกันข้อมูล error
    if(customer.first_name.length <=0 || customer.last_name.length <= 0){
      alert("error");
       return false;
    }

    let data = {
      first_name: customer.first_name,
      last_name: customer.last_name,
      phone: customer.phone,
      email: customer.email,
      avartar: customer.avartar,
      birthday: customer.birthday,
      address: customer.address
    }
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.baserow.io/api/database/rows/table/709110/?user_field_names=true",
      headers: {
        Authorization: "Token YUu0pkQ7FjbwpjqALu0gU9Z6MHHXtwRV",
      },
      data: data
    };
    axios
      .request(config)
      .then((response) => {
        setShow(false); ///ปิด Modal
        listCustomers(); ///โหลด Data ใหม่หลังจากบันทึกข้อมูลเสร็จ
        resetCustomerForm();
      })
      .catch((error) => {
        console.log(error);
        setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
      });

  }

  function updateCustomers(row_id) {
    let data = {
      first_name: customer.first_name,
      last_name: customer.last_name,
      phone: customer.phone,
      email: customer.email,
      avartar: customer.avartar,
      birthday: customer.birthday,
      address: customer.address
    }
    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `https://api.baserow.io/api/database/rows/table/709110/${row_id}/?user_field_names=true`,
      headers: {
        Authorization: "Token YUu0pkQ7FjbwpjqALu0gU9Z6MHHXtwRV",
      },
      data: data
    };
    axios
      .request(config)
      .then((response) => {
        setShow(false); ///ปิด Modal
        listCustomers(); ///โหลด Data ใหม่หลังจากบันทึกข้อมูลเสร็จ
        resetCustomerForm();
      })
      .catch((error) => {
        console.log(error);
        setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
      });
  }

  function deleteCustomers(row_id, firstName) {
    const confirmDelete = window.confirm(
      `คุณต้องการลบข้อมูลของ ${firstName} ใช่หรือไม่?`
    );
    if (!confirmDelete) {
      return false;
    }

    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url:`https://api.baserow.io/api/database/rows/table/709110/${row_id}/`,

      headers: {
        Authorization: "Token YUu0pkQ7FjbwpjqALu0gU9Z6MHHXtwRV",
      },
    };
    axios
      .request(config)
      .then((response) => {
        // เก็บข้อมูลลูกค้าใน state
        setShow(false);
        listCustomers();
      })
      .catch((error) => {
        console.log(error);
        setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
      });
  }

  return (
    <Container className='p-4'>
      <Card>
        <Card.Header>
          <Button variant="outline-primary"onClick={()=>[handleShow(),resetCustomerForm()]}>เพิ่มข้อมูล</Button>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <p>กำลังโหลดข้อมูล...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>รูปโปรไฟล์</th>
                  <th>ชื่อ-นามสกุล</th>
                  <th>เบอร์โทร</th>
                  <th>อีเมล</th>
                  <th>วันเกิด</th>
                  <th>ที่อยู่</th>
                  <th>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {customers.length > 0 ? (
                  customers.map((customer, index) => (
                    <tr key={customer.id || index}>
                      <td>{index + 1}</td>
                      <td><Image src={customer.avartar} roundedCircle thumbnail style={{ width: 120, height: 120 }} /></td>
                      <td>{customer.first_name || "-"} {customer.last_name || "-"}</td>
                      <td>{customer.phone || "-"}</td>
                      <td>{customer.email || "-"}</td>
                      <td>{customer.birthday || "-"}</td>
                      <td>{customer.address || "-"}</td>
                      <td>
                        <ButtonGroup className="mb-2" >
                          <Button variant="warning" onClick={(e) => handleEdit(customer)}>แก้ไข</Button>
                          <Button variant="danger" onClick={(e) => deleteCustomers(customer.id, customer.first_name)}>ลบ</Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))

                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      ไม่พบข้อมูลลูกค้า
                    </td>
                  </tr>)}

              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ฟอร์มข้อมูล</Modal.Title>
        </Modal.Header>
        <Modal.Body>กรุณากรอกข้อมูลลงในช่องว่าง
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>ชื่อ</Form.Label>
              <Form.Control
                type="text"
                placeholder="ชื่อ"
                value={customer?.first_name}
                onChange={(e) => handleInputChange('first_name', e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>นามสกุล</Form.Label>
              <Form.Control type="text" placeholder="นามสกุล"
                value={customer?.last_name}
                onChange={(e) => handleInputChange('last_name', e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>เบอร์โทร</Form.Label>
              <Form.Control type="tel" placeholder="xx-xxx-xxxxx"
                value={customer?.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com"
                value={customer?.email}
                onChange={(e) => handleInputChange('email', e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>วันเกิด</Form.Label>
              <Form.Control type="date" placeholder="name@example.com"
                value={customer?.birthday}
                onChange={(e) => handleInputChange('birthday', e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ที่อยู่</Form.Label>
              <Form.Control as="textarea" rows={3}
                value={customer?.address}
                onChange={(e) => handleInputChange('address', e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>รูปโปรไฟล์</Form.Label>
              <Form.Control link type="url" placeholder="insert link url"
              value={customer?.avartar}
                onChange={(e) => handleInputChange('avartar', e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ปิด
          </Button>
          <Button variant="primary" onClick={() => customer?.id > 0 ? updateCustomers(customer.id) : createCustomers()}>
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}