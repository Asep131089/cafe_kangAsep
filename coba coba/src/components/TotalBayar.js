import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { API_URL } from "../utils/constants";
import { Link } from "react-router-dom";

export default class TotalBayar extends Component {
  submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjangs,
    };
    axios.post(API_URL + "pesanans", pesanan).then((res) => {
      this.props.history.push("/sukses");
    });
  };
  render() {
    const totalBayar = this.props.keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0); // cara 1 error

    return (
      <>
        {/* Web */}
        <div className="fixed-bottom d-none d-md-block">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <h6>
                <strong className="float-right" mr={2}>
                  Total Harga : Rp.
                  {numberWithCommas(totalBayar)}
                </strong>
              </h6>

              <Button
                variant="primary"
                block className="mb-2 mt-4 mr-2"
                size="sm"
                style={{ width: "200px" }}
                onClick={() => this.submitTotalBayar(totalBayar)}
                as={Link} to={`/sukses`}
              >
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  style={{ marginRight: "1rem" }}
                />
                <strong>Bayar</strong>
              </Button>
            </Col>
          </Row>
        </div>

        {/* Mobile  */}
        <div className="d-sm-block d-md-none">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <h6>
                <strong className="float-right" mr={2}>
                  Total Harga : Rp.
                  {numberWithCommas(totalBayar)}
                </strong>
              </h6>

              <Button
                variant="primary"
                block
                className="mb-2 mt-4 mr-2"
                size="sm"
                style={{ width: "200px" }}
                onClick={() => this.submitTotalBayar(totalBayar)}
                
              >
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  style={{ marginRight: "1rem" }}
                  
                />
                <strong>Bayar</strong>
              </Button>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
