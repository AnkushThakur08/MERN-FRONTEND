export const addItemToCart = (item, next) => {
  let cart = [];

  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.push({
      ...item,
      count: 1,
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      console.log("ANkush");
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};

export const removeFromCart = (productId) => {
  let cart = [];

  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((IndividualItem, index) => {
      if (IndividualItem._id === productId) {
        cart.splice(index, 1);
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }

  return cart;
};

export const cartEmpty = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart");
    next();
  }
};
