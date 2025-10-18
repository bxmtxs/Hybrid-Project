import React, { useEffect, useState } from 'react';
import { Card, Table, Container, Image } from 'react-bootstrap';
import axios from 'axios';
export default function Customers() {

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  return (
    <Container className='p-4'>
      <Card>
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
                </tr>
              </thead>
              <tbody>
                {customers.length > 0 ? (
                  customers.map((customer, index) => (
                    <tr key={customer.id || index}>
                      <td>{index + 1}</td>
                      <td><Image src={customer.avartar} roundedCircle thumbnail style={{width :120, height:120}}/></td>
                      <td>{customer.first_name || "-"} {customer.last_name || "-"}</td>
                      <td>{customer.phone || "-"}</td>
                      <td>{customer.email || "-"}</td>
                      <td>{customer.birthday || "-"}</td>
                      <td>{customer.address || "-"}</td>
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
    </Container>
  )
}