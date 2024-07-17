
const customApexRadialBarDefault = (label, maxValue, colorList, gradientcolors) =>{
  const labels = label || ['Percent']
  const range = maxValue || 100
  const colors = colorList || ['#f94949', '#ffcb0e', '#02d512']
  const gradientColors = gradientcolors || [{ offset: 0, color: "#f94949", opacity: 1 }, { offset: 20, color: "#ffcb0e", opacity: 1 }, { offset: 100, color: "#02d512", opacity: 1 }]



  return {
    chart: {
      height: 300,
      type: 'donut',
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 360,
        hollow: {
          margin: 0,
          size: '70%',
          background: '#fff',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
        track: {
          background: '#fff',
          strokeWidth: '67%',
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35,
          },
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '16px',
          },
          value: {
            formatter: function(val) {
              return maxValue==100? parseInt(val) + '%' : parseInt(val)
            },
            color: '#111',
            fontSize: '50px',
            show: true,
          },
        },
      },
    },
    colors: colors,
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        colorStops: gradientColors,
      },
    },
    stroke: {
      lineCap: 'round',
    },
    labels: labels,
  }

}

export default customApexRadialBarDefault
