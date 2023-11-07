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

	function insert(base, value) {
		if(base === null) {
			base = node(value);
			return base;
		}

		if(value < base.data) {
			base.left = insert(base.left, value);
		} else {
			base.right = insert(base.right, value);
		}

		return base;
	}

	function deleteValue(base, value) {
		if(base === null) return base;

		if(value < base.data) {
			base.left = deleteValue(base.left, value);
			return base;
		} else if(value > base.data) {
			base.right = deleteValue(base.right, value);
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
		
		if(temp === null) return 'Value not found';

		if(value < temp.data) {
			temp = find(value, temp.left);
		} else if(value > temp.data) {
			temp = find(value, temp.right);
		}

		return temp;
	}

	return { 
		root,
		insert,
		deleteValue,
		find
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

myTree.insert(myTree.root, 17);
prettyPrint(myTree.root);

myTree.deleteValue(myTree.root, 8);
prettyPrint(myTree.root);

console.log(myTree.find(324));