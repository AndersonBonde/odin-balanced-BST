function node(data, left = null, right = null) {
	return { data, left, right };
}

function tree(arr) {
	const noDuplicates = arr.filter((value, index) => arr.indexOf(value) === index);
	const sorted = noDuplicates.sort((a, b) => a - b);

	let root = buildTree(sorted, 0, sorted.length - 1);

	function buildTree(arr, start, end) {
		let mid = Math.floor((start + end) / 2);

		if(start > end) return null;

		let data = node(arr[mid]);
		data.left = buildTree(arr, start, mid - 1);
		data.right = buildTree(arr, mid + 1, end);
		return data;
	}

	function insert(value, base = root) {
		if(base === null) {
			base = node(value);
			return base;
		}

		if(value < base.data) {
			base.left = insert(value, base.left);
		} else {
			base.right = insert(value, base.right);
		}

		return base;
	}

	function deleteValue(value, base = root) {
		if(base === null) return base;

		if(value < base.data) {
			base.left = deleteValue(value, base.left);
			return base;
		} else if(value > base.data) {
			base.right = deleteValue(value, base.right);
			return base;
		}

		if(base.left === null) {
			let temp = base.right;
			delete base;
			return temp;
		} else if(base.right === null) {
			let temp = base.left;
			delete base;
			return temp;
		} else {
			let parent = base;
			let inOrder = base.right;

			while(inOrder.left !== null) {
				parent = inOrder;
				inOrder = inOrder.left;
			}

			if(parent !== base) {
				parent.left = inOrder.right;
			} else {
				parent.right = inOrder.right;
			}

			base.data = inOrder.data;
			delete inOrder;
			return base;
		}
	}

	function find(value, base = root) {
		let temp = base;
		
		if(temp === null) return null;

		if(value < temp.data) {
			temp = find(value, temp.left);
		} else if(value > temp.data) {
			temp = find(value, temp.right);
		}

		return temp;
	}

	function levelOrder(callback) {
		let queue = [];
		let arr = [];
		queue.push(root);

		while(queue.length > 0) {
			let curr = queue.shift();
			arr.push(curr.data);
			if(callback) {
				curr.data = callback(curr.data);
			}

			if(curr.left !== null) {
				queue.push(curr.left);
			} 
			if(curr.right !== null) {
				queue.push(curr.right);
			}
		}

		if(!callback) {
			return arr;
		}
	}

	function inOrder(callback = undefined, base = root, arr = []) {
		if(base === null) return;

		inOrder(callback, base.left, arr);
		arr.push(base.data);
		if(callback) base.data = callback(base.data);
		inOrder(callback, base.right, arr);

		if(!callback) return arr;
	}

	function preOrder(callback = undefined, base = root, arr = []) {
		if(base === null) return;

		arr.push(base.data);
		if(callback) base.data = callback(base.data);
		preOrder(callback, base.left, arr);
		preOrder(callback, base.right, arr);

		if(!callback) return arr;
	}

	function postOrder(callback = undefined, base = root, arr = []) {
		if(base === null) return;

		postOrder(callback, base.left, arr);
		postOrder(callback, base.right, arr);
		arr.push(base.data);
		if(callback) base.data = callback(base.data);

		if(!callback) return arr;
	}

	function height(node) {
		if(node === null) return -1;

		let left;
		let right;

		left = height(node.left) + 1;
		right = height(node.right) + 1;

		return Math.max(left, right);
	}

	function depth(node, base = root) {
		if(base === null || node === null) return -1;

		let dist = -1;

		if((base.data == node.data) ||
			(dist = depth(node, base.left)) >= 0 ||
			(dist = depth(node, base.right)) >= 0) {
				return dist + 1;
			}

		return dist;
	}

	return { 
		root,
		insert,
		deleteValue,
		find,
		levelOrder,
		inOrder,
		preOrder,
		postOrder,
		height,
		depth
	 };
}
const myTree = tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

// Function to visualize the binary search tree;
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
prettyPrint(myTree.root);
