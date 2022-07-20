<script>
	export let disabled = false;
	export let type;

	let className;
	export { className as class };
</script>

<button
	class={'px-4 py-1 border border-cyan-900 bg-cyan-900 shadow-sm rounded-sm text-gray-100 font-bold disabled:cursor-not-allowed disabled:text-gray-400 disabled:bg-cyan-700 trainsition-colors duration-100 focus:bg-cyan-800 hover:bg-cyan-800 ' +
		className}
	{disabled}
	{type}><slot /></button
>
