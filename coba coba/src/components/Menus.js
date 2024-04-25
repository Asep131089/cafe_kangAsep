import React from 'react'
import {Col, Card} from 'react-bootstrap'
import {numberWithCommas} from '../utils/utils'

const Menus = ({menu, masukKeranjang}) => {
  return (
    <Col md={4} xs={6} className="mb-4">
    <Card className='shadow' onClick={() =>masukKeranjang(menu)}>
      <Card.Img 
      variant="top" 
      src={
        "assets/images/"+
        menu.category.nama.toLowerCase()+
        "/"+
        menu.gambar
        }
        />
      <Card.Body>
        <Card.Title>{menu.nama}
        
        {/* NOTE : ({menu.kode}) sengaja tidak ditampilkan untuk mensesuaikan gambar  */}

         {/* ({menu.kode}) */}      
         </Card.Title>
        <Card.Text>
         Rp.  {numberWithCommas(menu.harga)}
        </Card.Text>
      </Card.Body>
    </Card>
    </Col>
    // <div>
    //   <h2>{menu.nama}</h2>
    // </div>
  )
}

export default Menus
