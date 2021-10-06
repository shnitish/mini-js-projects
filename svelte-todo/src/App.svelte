<script>
	import Element from "./Element.svelte";
	$: inputValue = "";
	$: splitValues = [];
	let hexColors = ["#FF5733", "#94766F", "#8EC94A", "#585C9B"];

	const handleKeyPress = (e) => {
		/*
		@author: Nitish
		Created on Wed Sep 01 00:48 2021
		Handle 'Enter' keypress on input element

		Parameter
		---------
		e: event object
		*/
		if (e.key === "Enter") {
			handleButtonClick();
		}
	};

	const handleButtonClick = () => {
		/*
		@author: Nitish
		Created on Wed Sep 01 00:48 2021
		Split input string to array of objects, each object has it's string value and predefined text color and then set it to 'splitValues' state variable.
		*/
		if (inputValue === "") {
			return;
		}

		try {
			inputValue = inputValue.trim();
			let arr = JSON.parse(inputValue);
			let filteredArr = arr.filter((e) => {
				e = e.trim();
				return e;
			});
			
			splitValues = filteredArr.map((value, index) => {
				return {
					value: value,
					color: hexColors[(index + 1) % hexColors.length],
				};
			});
		} catch (err) {
			alert("Enter in correct syntax");
		}
	};
</script>

<!-- 
@author: Nitish
Created on Wed Sep 01 00:48 2021
Markup to render state variables through HTML elements. 
-->
<main>
	<div class="main-div">
		<div class="header">
			<input
				bind:value={inputValue}
				type="text"
				class="input-box"
				on:keypress={handleKeyPress}
				placeholder="Enter a string in ['a', 'b', 'c'] format"
			/>
			<button on:click={handleButtonClick}>Submit</button>
		</div>

		<div class="elements">
			{#each splitValues as value}
				<Element elementValue={value} />
			{/each}
		</div>
	</div>
</main>

<!-- 
@author: Nitish
Created on Wed Sep 01 00:48 2021
Styling for markup elements.
-->
<style>
	main {
		display: flex;
		justify-content: center;
	}

	.main-div {
		min-width: 30%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	.header {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.input-box {
		outline: none;
		width: 90%;
	}

	.elements {
		width: 100%;
	}

	button {
		background-color: crimson;
		color: white;
	}
</style>
