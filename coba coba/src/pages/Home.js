import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Hasil, ListCategories, Menus } from "../components";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoriYangDipilih: "Makanan", // rubah rubah ke Minuman atau makanan atau cemilan untuk menampilkan di home yang dipilih   
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categoriYangDipilih)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });

    // axios
    //   .get(API_URL + "keranjangs")
    //   .then((res) => {
    //     const keranjangs = res.data;
    //     this.setState({ keranjangs });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    this.getListKeranjang();

  }

  // componentDidUpdate(prevState) {
  //   if (this.state.keranjangs !== prevState.keranjangs) {
  //     axios
  //       .get(API_URL + "keranjangs")
  //       .then((res) => {
  //         console.log("Cek")
  //         const keranjangs = res.data;
  //         this.setState({ keranjangs });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }

getListKeranjang = () =>{
  axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log(error);
      });
}

  changeCategory = (value) => {
    this.setState({
      categoriYangDipilih: value,
      menus: [],
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: "Sukses masuk Keranjang!",
                text: "Sukses masuk Keranjang" + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1000, // waktu menghilang sweetalert
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              swal({
                title: "Sukses masuk Keranjang!",
                text: "Sukses masuk Keranjang" + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1000, // waktu menghilang sweetalert
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const { menus, categoriYangDipilih, keranjangs } = this.state;
    return (
      <div className="mt-3">
        <Container fluid>
          <Row>
            <Col md={2}>
              <ListCategories
                changeCategory={this.changeCategory}
                categoriYangDipilih={categoriYangDipilih}
              />
            </Col>
            <Col md={6}>
              <h4>
                <strong>Daftar Produk</strong>
              </h4>
              <hr />
              <Row className="overflow-auto menu">
                {menus &&
                  menus.map((menu) => (
                    <Menus
                      key={menu.id}
                      menu={menu}
                      masukKeranjang={this.masukKeranjang}
                    />
                  ))}
              </Row>
            </Col>
            <Hasil keranjangs={keranjangs} {...this.props} getListKeranjang={this.getListKeranjang}/>
          </Row>
        </Container>
      </div>
    );
  }
}
