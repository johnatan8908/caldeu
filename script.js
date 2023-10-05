function calcularDiario(monto, fechaVencimiento) {
    const hoy = new Date();
    const fechaVenc = new Date(fechaVencimiento);
    const diasRestantes = Math.ceil((fechaVenc - hoy) / (1000 * 60 * 60 * 24));
    return monto / diasRestantes;
}

function agregarDeuda() {
    const nombre = document.getElementById('nombre').value;
    const monto = parseFloat(document.getElementById('monto').value);
    const fecha = document.getElementById('fecha').value;
    const cantidadDiaria = calcularDiario(monto, fecha);

    const listaDeudas = document.getElementById('deudas');
    const nuevaDeuda = document.createElement('li');
    nuevaDeuda.textContent = `${nombre}: $${monto}, Diario: $${cantidadDiaria.toFixed(2)}`;
    listaDeudas.appendChild(nuevaDeuda);

    // Limpiar los campos
    document.getElementById('nombre').value = '';
    document.getElementById('monto').value = '';
    document.getElementById('fecha').value = '';
}

function calcularTotalDiario() {
    const deudas = document.getElementById('deudas').getElementsByTagName('li');
    let totalDiario = 0;

    for (let i = 0; i < deudas.length; i++) {
        const datos = deudas[i].textContent.split(': ');
        const monto = parseFloat(datos[1].split(',')[0].slice(2));
        const fecha = datos[2].split(':')[1].slice(1);

        totalDiario += calcularDiario(monto, fecha);
    }

    return totalDiario.toFixed(2);
}

function mostrarTotalDiario() {
    const totalDiario = calcularTotalDiario();
    alert(`Debes recolectar un total de $${totalDiario} cada día.`);
}

function exportarExcel() {
    const deudas = document.getElementById('deudas').getElementsByTagName('li');
    let csvContent = "Nombre,Monto,Diario\n";
    
    for (let i = 0; i < deudas.length; i++) {
        const datos = deudas[i].textContent.split(': ');
        const nombre = datos[0];
        const monto = datos[1].split(',')[0].slice(2);
        const diario = datos[2].split(':')[1].slice(1);
        csvContent += `${nombre},${monto},${diario}\n`;
    }

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'deudas.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}
