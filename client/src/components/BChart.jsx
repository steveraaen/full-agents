import React, { lazy, Suspense } from 'react';
import { BarChart, Bar, Brush, CartesianGrid, XAxis, YAxis, Text,  Tooltip, LabelList, Legend, ResponsiveContainer } from 'recharts';
import CustTip from './CustTip'
// const CustTip = lazy(() => import('./CustTip'));

export default function BChart(props) {
  
  if(props.data){
    return (   
      <ResponsiveContainer height = {200} width = "100%">
        <BarChart
        barCategoryGap = '5%'
          width={1000}
          height={200}
          data={props.data.graphAll}
          margin={{ top: 10, right: 20, left: 40, bottom: 0 }}
        >
          <XAxis dataKey = 'agent'/>
          <Tooltip 
          content={<CustTip />} 
         /> 

          <Bar
          onClick = {function (ev) {
            props.getBatDetail(ev)
            props.getPitchDetail(ev)
            props.setAgent(ev.agent)}}
            onMouseEnter = {((ev) => console.log(ev))}
           dataKey="bplayers.val"
            stackId="1"
            stroke="#003f5c"
            fill="#003f5c"
            id="aarea"
            name="Batters|Pitchers"
            >
            </Bar>        
          <Bar
          onClick = {function (ev) {
            props.getBatDetail(ev)
            props.getPitchDetail(ev)
            props.setAgent(ev.agent)}}
            dataKey="bamount.val"
            stackId="1"
            stroke="#bc5090"
            fill="#bc5090"
            id="barea"
            name="Salary (million)"    
          />
          <Bar
          onClick = {function (ev) {
            props.getBatDetail(ev)
            props.getPitchDetail(ev)
            props.setAgent(ev.agent)}}
           dataKey="byears.val"
            stackId="1"
            stroke="#ff7f50"
            fill="#ff7f50"
            id="carea"
            name="Years"          
          />

          <Bar
          onClick = {function (ev) {
            props.getBatDetail(ev)
            props.getPitchDetail(ev)
            props.setAgent(ev.agent)}}
           dataKey="pplayers.val"
            stackId="2"
            stroke="#003f5c"
            fill="#003f5c"
            id="darea"
          
            />        
          <Bar
          onClick = {function (ev) {
            props.getBatDetail(ev)
            props.getPitchDetail(ev)
            props.setAgent(ev.agent)}}
            dataKey="pamount.val"
            stackId="2"
            stroke="#bc5090"
            fill="#bc5090"
            id="earea"
               
          />
          <Bar
          onClick = {function (ev) {
            props.getBatDetail(ev)
            props.getPitchDetail(ev)
            props.setAgent(ev.agent)}}
           dataKey="pyears.val"
            stackId="2"
            stroke="#ff7f50"
            fill="#ff7f50"
            id="farea"

          />
        </BarChart>
        </ResponsiveContainer>
  
    );
  }
}
