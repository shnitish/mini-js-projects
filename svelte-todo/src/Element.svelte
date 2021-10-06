<script>
/*
@author: Nitish
Created on Wed Sep 01 00:48 2021
Prop exposed to app component.
*/
	export let elementValue;
</script>

<!-- 
@author: Nitish
Created on Wed Sep 01 00:48 2021
Custom component to render a particular string object from app component.
-->
<div class="element" style="color: {elementValue.color}">
	{elementValue.value}
</div>

<style>
	.element {
    font-weight: bold;
		background-color: aliceblue;
		padding: 10px 10px;
		cursor: pointer;
		margin-top: 1rem;
	}
</style>
