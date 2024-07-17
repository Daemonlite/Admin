
import { hexToRgb } from '@layouts/utils'
import { useTheme } from 'vuetify'

// Colors variables

export const colorVariables = () => {
  const vueTheme = useTheme()
  const vueThemeColors = ref(vueTheme.current.value.colors)
  const vueThemeVariables = ref(vueTheme.current.value.variables)
  const themeSecondaryTextColor = `rgba(${hexToRgb(vueThemeColors.value['on-surface'])},${vueThemeVariables.value['medium-emphasis-opacity']})`
  const themeDisabledTextColor = `rgba(${hexToRgb(vueThemeColors.value['on-surface'])},${vueThemeVariables.value['disabled-opacity']})`
  const themeBorderColor = `rgba(${hexToRgb(String(vueThemeVariables.value['border-color']))},${vueThemeVariables.value['border-opacity']})`
  const themePrimaryTextColor = `rgba(${hexToRgb(vueThemeColors.value['on-surface'])},${vueThemeVariables.value['high-emphasis-opacity']})`
    
  return { vueThemeColors, vueThemeVariables, themeSecondaryTextColor, themeDisabledTextColor, themeBorderColor, themePrimaryTextColor }
}

export const mixCharts = (data={ titleText: '', titleColor: '', labels: [], strokeWidth: [] || '', fillType: [] || '', xaxisType: '', opacity: null })=> {
  const { themeSecondaryTextColor, themeBorderColor, themeDisabledTextColor, themePrimaryTextColor } = colorVariables()
  
  return{
    chart: {
      type: 'line',
      stacked: false,
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
        color: '#312d4b80',
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.2,
      },
    },
  
    stroke: {
      width: data.strokeWidth || 0,
      curve: 'smooth',
    },
  
    plotOptions: {
      bar: {
        columnWidth: '50%',
      },
      
    },
  
    grid: {
      borderColor: 'rgba(171 ,171 ,171,0.2)',
      xaxis: {
        lines: { show: false },
      },
      yaxis: {
        lines: { show: false },
      },
      padding: {
        bottom: 0,
      },
    },
  
    fill: {
      type: data.fillType || 'color',
      opacity: data.opacity || 1,
      gradient: {
        shadeIntensity: 1,
        type: "vertical",
        shade: 'light',
        inverseColors: false,
        opacityFrom: 0.9,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
  
    labels: data.labels || [
      '01/01/2003',
      '02/01/2003',
      '03/01/2003',
      '04/01/2003',
      '05/01/2003',
      '06/01/2003',
      '07/01/2003',
      '08/01/2003',
      '09/01/2003',
      '10/01/2003',
      '11/01/2003',
    ],
  
    legend: {
      labels: {
        colors: themePrimaryTextColor,
      },
      fontFamily: 'arial !important',
      position: 'top',
    },
  
    title: {
      text: data.titleText || "ISSUE STATS",
      align: 'left',
      style: {
        fontSize: '16px',
        fontWeight: '500',
        fontFamily: 'arial !important',
        color: data.titleColor || themePrimaryTextColor,
      },
    },
  
    markers: {
      size: 0,
    },
  
    xaxis: {
      type: data.xaxisType || 'datetime',
      tickPlacement: 'between',
      labels: {
        style: { 
          colors: themeDisabledTextColor,
          fontFamily: 'arial !important',
        },
        datetimeFormatter: {
          year: 'yyyy',
          month: "MMM yy",
        },
      },
      axisBorder: {
        color: '#e0e0e0',
      },
      axisTicks: {
        color: '#e0e0e0',
      },
    },
  
    yaxis: {
      show: false,
      min: 0,
      labels: {
        style: { 
          colors: themeSecondaryTextColor,
          fontFamily: 'arial !important',
        },
      },
    },
  
    tooltip: {
      enabled: true,
      theme: 'light',
      x: {
        show: false,
        format: 'MMM yyyy',
      },
    },
  }
  
}

export const minChartsLine =(data = { labels: [] }) => {
  return{
    chart: {
      type: 'area',
      sparkline: {
        enabled: true,
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.2,
      },
    },
    stroke: {
      width: 3,
    },
    labels: data.labels,
    grid: {
      padding: {
        top: 10,
        bottom: 10,
      },
    },
    xaxis: {
      tickPlacement: 'on',
    },

    tooltip: {
      theme: 'dark',
      custom(data) {
        if(data.series[data.seriesIndex][data.dataPointIndex]){           
          let valid = new Date(data.w.globals.categoryLabels[data.dataPointIndex])
                    
          return  `<div class='bar-chart pa-2 text-white d-flex align-center gap-3' style='background: rgb(0 0 0 / 50%);;'>
          <div style="background-color: ${data.w.globals.seriesColors[data.seriesIndex]}; height:10px; width:10px; border-radius: 10px; border: #fff 2px solid;"></div>
          <span> ${!isNaN(valid)?valid.toLocaleString('default', { month: 'short', year: 'numeric' }): data.w.globals.categoryLabels[data.dataPointIndex]}:  ${data.series[data.seriesIndex][data.dataPointIndex]}</span>
          </div>`}
        else{
          return  ''
        }
      },
      theme: 'dark',
      followCursor: true,
      style: {
        fontFamily: 'arial !important',
        fontSize: '14px',
      },
    },
  }
}

export const minChartsRadial = (data = { labels: [], colors: [], trackColors: null, labelsColors: null })=> {
  const { vueThemeColors, themeSecondaryTextColor, themeBorderColor, themeDisabledTextColor, themePrimaryTextColor } = colorVariables()

  return {
    chart: {
      type: "radialBar",
    },
    colors: data.colors || ["#FF5722"],
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          startAngle: -90,
          margin: 10,
          endAngle: 90,
          background: data.trackColors || vueThemeColors.value.background,
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 4,
            opacity: 0.2,
          },
        },
  
        dataLabels: {
          name: {
            color: data.labelsColors || themeSecondaryTextColor,
            show: false,
          },
          value: {
            offsetY: -5,
            color: data.labelsColors || "#293450",
            fontSize: "20px",
            fontWeight: '500',
            fontFamily: 'arial !important',
            show: true,
          },
        },
      },
    },
    fill: {
      type: "color",
      gradient: {
        shade: "light",
        type: "vertical",
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: data.labels || ["Progress"],
    yaxis: {
      crosshairs: {
        show: false,
      },
    },
  }
}
  
export const minChartsRadial2 = (data = { labels: [], colors: [], trackColors: null, labelsColors: null, dataLablesValue: false, dataLablesName: false })=> {
  const { vueThemeColors, themeSecondaryTextColor, themeBorderColor, themeDisabledTextColor, themePrimaryTextColor } = colorVariables()

  return {
    chart: {
      type: 'radialBar',
      sparkline: {
        enabled: true,
      },
    },
    colors: data.colors || ["#FF5722"],

    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: '50%',
        },
        track: {
          margin: 1,
          background: data.trackColors || vueThemeColors.value.background,
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 4,
            opacity: 0.2,
          },
        },
        dataLabels: {
          name: {
            color: data.labelsColors || themePrimaryTextColor,
            show: data.dataLablesName,
          },
          value: {
            offsetY: 5,
            color: data.labelsColors || themePrimaryTextColor,
            fontSize: "12px",
            fontWeight: '500',
            fontFamily: 'arial !important',
            show: data.dataLablesValue,
          },
        },
      },
    },
    fill: {
      type: "color",
      gradient: {
        shade: "light",
        type: "vertical",
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
  }
}
  
export const minChartsPieDonut =(data = { strokeWidth: '', strokeColors: ['#1E252A'] || '', donutSize: '', donutLabels: null, labels: ['mile'], showLabelName: false, labelValueColor: '#1E252A', showLengend: false, legendPosition: 'bottom', legendFloating: true  }) =>{
  const { vueThemeColors, themeSecondaryTextColor, themeBorderColor, themeDisabledTextColor, themePrimaryTextColor } = colorVariables()

  // console.log(vueThemeColors.value)
  
  return {
    chart: {
      sparkline: { enabled: true },
      animations: { enabled: false },
      type: 'donut',
      height: '100%',
    },
    stroke: {
      width: data.strokeWidth || 5,
      colors: data.strokeColors || [vueThemeColors.value['skin-default-surface']],
    },
    dataLabels: { enabled: false },
    labels: data.labels, 
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } },
    },

    plotOptions: {
      pie: {
        expandOnClick: false,
        customScale: 0.8,
        donut: {
          size: data.donutSize || '75%',
          labels: data.donutLabels || {
            show: true,
            name: {
              show: data.showLabelName,
            },
            value: {
              offsetY: 8,
              fontSize: '26px',
              color: data.labelValueColor || themePrimaryTextColor,
              fontWeight: 800,
              fontFamily: 'arial',
  
              formatter: function (val) {                
                return val
              },
            },
            total: {
              show: true,
              fontSize: '12px',
              fontWeight: 500,
              fontFamily: 'Arial',
              color: themePrimaryTextColor,
              formatter: function (val) {                
                return val?.globals?.seriesTotals?.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
              },
            },
          },
        },
      },
    },

    legend: {
      show: data.showLengend,
      floating: data.legendFloating,
      fontSize: '12px',
      fontFamily: 'Arial',
      position: data.legendPosition || 'right',
      labels: {
        colors: themePrimaryTextColor,
      },
      markers: {
        width: 8,
        height: 8,
      },
  
    },

    tooltip: {
      enabled: true,
    },
    yaxis: {
      crosshairs: {
        show: false,
      },
    },
  }
}

export const miniChartsColumn = (data = { labels: [], colors: [] }) =>{
  const { vueThemeColors, themeSecondaryTextColor, themeBorderColor, themeDisabledTextColor, themePrimaryTextColor } = colorVariables()
  
  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
        color: '#312d4b80',
      },   
    },

    grid: {
      show: false,
    },
    
    colors: data.colors || [vueThemeColors.value.primary],

    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0,
        type: "vertical",
        inverseColors: false,
        opacityFrom: 0.9,
        opacityTo: 0.2,
        stops: [0, 90],
      },
    },

    plotOptions: {
      bar: {
        borderRadius: 4,
        distributed: true,
        columnWidth: '60%',
        endingShape: 'rounded',
        startingShape: 'rounded',
      },
    },

    legend: { show: false },   

    dataLabels: { enabled: false },
    labels: data.labels,
  
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } },
    },

    xaxis: {
      tickPlacement: 'on',
      labels: { show: true },
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: {
        trim: true,
        style: {
          colors: themeSecondaryTextColor, 
        },
      },
    },

    yaxis: { show: false },
    
    tooltip: { 
      enabled: true,
      theme: 'dark',
    },
  }
}


/* 
custom(data) {
        if(data.series[data.seriesIndex][data.dataPointIndex]){ 
          return  `<div class='bar-chart pa-2 text-white d-flex align-center gap-3' >
          <div style="background-color: ${data.w.globals.seriesColors[data.seriesIndex]}; height:10px; width:10px; border-radius: 10px; border: #fff 2px solid;"></div>
          <span> ${data.w.globals.seriesNames[data.seriesIndex]} ${data.series[data.seriesIndex][data.dataPointIndex]}</span>
          </div>`}
        else{
          return  ''
        }
      },
      theme: 'dark',
      followCursor: true,
      style: {
        fontFamily: 'arial !important',
        fontSize: '14px',
      }, */
  
  