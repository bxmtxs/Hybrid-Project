import React from 'react'
import {Card, Table, Container} from 'react-bootstrap';
export default function Customers() {
  return (
    <Container className='p-4'>
    <Card>
      <Card.Body>
        <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>ชื่อ-นามสกุล</th>
          <th>เบอร์โทร</th>
          <th>อีเมล</th>
          <th>วันเกิด</th>
          <th>ที่อยู่</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>ฐิติศรี ตะเคียนจันทร์</td>
          <td>061-846-4601</td>
          <td>67130066@dpu.ac.th</td>
          <td>2001-09-05</td>
          <td>BKK,TH</td>
        </tr>
        <tr>
          <td>2</td>
          <td>ฐิติศรี ตะเคียนจันทร์</td>
          <td>061-846-4601</td>
          <td>67130066@dpu.ac.th</td>
          <td>2001-09-05</td>
          <td>BKK,TH</td>
        </tr>
        <tr>
          <td>3</td>
          <td>ฐิติศรี ตะเคียนจันทร์</td>
          <td>061-846-4601</td>
          <td>67130066@dpu.ac.th</td>
          <td>2001-09-05</td>
          <td>BKK,TH</td>
        </tr>
        <tr>
          <td>4</td>
          <td>ฐิติศรี ตะเคียนจันทร์</td>
          <td>061-846-4601</td>
          <td>67130066@dpu.ac.th</td>
          <td>2001-09-05</td>
          <td>BKK,TH</td>
        </tr>
      </tbody>
    </Table>
      </Card.Body>
    </Card>
    </Container>
  )
}

