import React, { Component } from "react";
import "./FooterBottom.css";

class FooterBottom extends Component {
  constructor() {
    super();
    this.state = {
      foodPics: [],
    };
  }

  shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  componentDidMount() {
    const { REACT_APP_API_URL } = process.env;
    fetch(REACT_APP_API_URL + "/foods")
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        let foodsArray = this.shuffle(data.data),
          foodPics = foodsArray.slice(0, 6).map((food) => {
            return (
              <div className="individual-food-pic">
                <img
                  src={"http://wptest.me/images/food/" + food.picture}
                  alt="food"
                />
              </div>
            );
          });
        this.setState({ foodPics: foodPics });
      });
  }

  render() {
    return (
      <footer className="rfow-footer-bottom bg-black">
        <div className="food-pics">{this.state.foodPics}</div>
        <div className="rfow-links">
          <div className="footer-contact">
            <h2 className="text-custom-white">{"Need Help"}</h2>
            <ul>
              <li className="fw-600">
                <span className="text-light-white">{"Call Us"}</span>
                <span className="text-white">{"+(977) 9845690436"}</span>
              </li>
              <li className="fw-600">
                <span className="text-light-white">{"Email Us"}</span>
                <span className="text-white">{"demo@domain.com"}</span>
              </li>
              <li className="fw-600">
                <span className="text-light-white">{"Join our twitter"}</span>
                <span className="text-white">{"@foodie"}</span>
              </li>
              <li className="fw-600">
                <span className="text-light-white">{"Join our instagram"}</span>
                <span className="text-white">{"@foodie"}</span>
              </li>
            </ul>
          </div>
          <div className="footer-about">
            <h2 className="text-custom-white">{"Get To Know Us"}</h2>
            <ul>
              <li>
                <a
                  className="text-light-white fw-600"
                  href="http://themegrill.me:3000/"
                >
                  {"About Us"}
                </a>
              </li>
              <li>
                <a
                  className="text-light-white fw-600"
                  href="http://themegrill.me:3000/"
                >
                  {"Blog"}
                </a>
              </li>
              <li>
                <a
                  className="text-light-white fw-600"
                  href="http://themegrill.me:3000/"
                >
                  {"Socialize"}
                </a>
              </li>
              <li>
                <a
                  className="text-light-white fw-600"
                  href="http://themegrill.me:3000/"
                >
                  {"FooDie"}
                </a>
              </li>
              <li>
                <a
                  className="text-light-white fw-600"
                  href="http://themegrill.me:3000/"
                >
                  {"Perks"}
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-support">
            <h2 className="text-custom-white">{"Let Us Know You"}</h2>
            <ul>
              <li>
                <a
                  className="text-light-white fw-600"
                  href="http://themegrill.me:3000/"
                >
                  {"Account Details"}
                </a>
              </li>
              <li>
                <a
                  className="text-light-white fw-600"
                  href="http://themegrill.me:3000/"
                >
                  {"Order History"}
                </a>
              </li>
              <li>
                <a
                  className="text-light-white fw-600"
                  href="http://themegrill.me:3000/"
                >
                  {"Find restaurant"}
                </a>
              </li>
              <li>
                <a
                  className="text-light-white fw-600"
                  href="http://themegrill.me:3000/"
                >
                  {"Login"}
                </a>
              </li>
              <li>
                <a
                  className="text-light-white fw-600"
                  href="http://themegrill.me:3000/"
                >
                  {"Track order"}
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-business">
            <h2 className="text-custom-white">{"Doing Business ?"}</h2>
            <ul>
              <li>
                <a
                  className="text-light-white fw-600"
                  href="http://themegrill.me:3000/"
                >
                  {"Suggest an Idea"}
                </a>
              </li>
              <li>
                <a
                  className="text-light-white fw-600"
                  href="http://themegrill.me:3000/"
                >
                  {"Be a Partner restaurant"}
                </a>
              </li>
              <li>
                <a
                  className="text-light-white fw-600"
                  href="http://themegrill.me:3000/"
                >
                  {"Create an Account"}
                </a>
              </li>
              <li>
                <a
                  className="text-light-white fw-600"
                  href="http://themegrill.me:3000/"
                >
                  {"Help"}
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-download">
            <h2 className="text-custom-white">{"Download Apps"}</h2>
            <div className="appimage">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get Ti On Google Play"
              />
              <img
                src="https://markseducation.com/wp-content/uploads/2016/11/link-badge-appstore_2x.png"
                alt="Get Ti On Google Play"
              />
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default FooterBottom;
