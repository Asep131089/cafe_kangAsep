import React, { Component } from "react";
import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import TotalBayar from "./TotalBayar";
import ModalKeranjang from "./ModalKeranjang";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }

  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga:
        this.state.keranjangDetail.product.harga * (this.state.jumlah + 1),
    });
  };

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga:
          this.state.keranjangDetail.product.harga * (this.state.jumlah - 1),
      });
    }
  };

  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.handleClose();

    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keterangan,
    };

    axios
      .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
      .then((res) => {
        this.props.getListKeranjang()
        swal({
          title: "Update Pesanan",
          text: "Sukses Update Pesanan" + data.product.nama,
          icon: "success",
          button: false,
          timer: 1000, // waktu menghilang sweetalert
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Delete
  hapusPesanan = (id) => {
    this.handleClose();

    axios
      .delete(API_URL + "keranjangs/" + id)
      .then((res) => {
        this.props.getListKeranjang();
        swal({
          title: "Hapus Pesanan",
          text:
            "Sukses Hapus Pesanan" + this.state.keranjangDetail.product.nama,
          icon: "error",
          button: false,
          timer: 1000, // waktu menghilang sweetalert
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={4} mt="2">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        {keranjangs.length !== 0 && (
        <Card className="overflow-auto hasil">
          <ListGroup variant="flush">
            {keranjangs.map((menuKeranjang) => (
         
              <ListGroup.Item
                key={menuKeranjang.id}
                onClick={() => this.handleShow(menuKeranjang)}
              >
                <Row>
                  <Col xs={2}>
                    <h6>
                      <Badge pill bg="success">
                        {menuKeranjang.jumlah}
                      </Badge>
                    </h6>
                  </Col>
                  <Col xs={5}>
                    <h6>{menuKeranjang.product.nama}</h6>
                    <p>Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
                  </Col>
                  <Col>
                    <h6>
                      <strong className="float-right">
                        Rp. {numberWithCommas(menuKeranjang.total_harga)}
                      </strong>
                    </h6>
                  </Col>
                </Row>
              </ListGroup.Item>
            
              
            ))}
            <ModalKeranjang
              handleClose={this.handleClose}
              {...this.state}
              tambah={this.tambah}
              kurang={this.kurang}
              changeHandler={this.changeHandler}
              handleSubmit={this.handleSubmit}
              hapusPesanan={this.hapusPesanan}
            />
          </ListGroup>
          </Card>
        )}
        <TotalBayar keranjangs="keranjangs" {...this.props}  />
      </Col>
    );
  }
}
