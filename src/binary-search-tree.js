// const { NotImplementedError } = require('../lib/errors');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.rootNode) {
      this.rootNode = newNode;
      return;
    }

    let current = this.rootNode;
    while (true) {
      if (data < current.data) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  find(data) {
    let current = this.rootNode;

    while (current) {
      if (data === current.data) {
        return current;
      }
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return null;
  }

  has(data) {
    return this.find(data) !== null;
  }

  remove(data) {
    this.rootNode = this.removeNode(this.rootNode, data);
  }

  removeNode(node, data) {
    if (!node) {
      return null;
    }

    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    } else {
      // Node to be removed found

      // Case 1: No children (leaf node)
      if (!node.left && !node.right) {
        return null;
      }

      // Case 2: One child from right
      if (!node.left) {
        return node.right;
      }

      // Case 3: One child from left
      if (!node.right) {
        return node.left;
      }

      // Case 4: Two children
      // Find the minimum node in the right subtree (successor)
      let minRight = node.right;
      while (minRight.left) {
        minRight = minRight.left;
      }
      node.data = minRight.data;

      node.right = this.removeNode(node.right, minRight.data);

      return node;
    }
  }

  min() {
    if (!this.rootNode) {
      return null;
    }

    // Look minimum value in the left subtree
    let current = this.rootNode;
    while (current.left) {
      current = current.left;
    }

    return current.data;
  }

  max() {
    if (!this.rootNode) {
      return null;
    }

    // Look maximum value in the right subtree
    let current = this.rootNode;
    while (current.right) {
      current = current.right;
    }

    return current.data;
  }
}

// Example usage:

// const bst = new BinarySearchTree();
// bst.add(10);
// bst.add(5);
// bst.add(15);
// console.log(bst.has(10)); // true
// console.log(bst.has(7));  // false
// console.log(bst.min());   // 5
// console.log(bst.max());   // 15
// bst.remove(10);
// console.log(bst.has(10)); // false

module.exports = {
  BinarySearchTree
};