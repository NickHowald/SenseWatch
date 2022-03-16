
function mySettings(props) {
  const colorItems=[
            {color: 'black'}, 
            {color: 'white'},
            {color: 'whitesmoke'},
            {color: 'wheat'},
            {color: 'darkred'},
            {color: 'firebrick'},
            {color: 'indigo'},
            {color: 'royalblue'},
            {color: 'brown'},
            {color: 'darkmagenta'},
            {color: 'olive'},
            {color: 'darkviolet'},
            {color: 'aquamarine'},
            {color: 'chartreuse'},            
            {color: 'gold'},            
            {color: 'khaki'},
            {color: 'lawngreen'}, 
            {color: 'springgreen'},
            {color: 'lightseagreen'},
            {color: 'red'},
            {color: 'thistle'},
            {color: 'darkturquoise'},
            {color: 'lightsalmon'},
            {color: 'lightcoral'},
            {color: 'lightskyblue'},
            {color: 'orange'},
            {color: 'pink'},
            {color: 'yellow'}
                     ];
  
  return (
//import { units } from "user-settings";
//console.log(units.temperature);

<Page>

  
  <Section
   title={<Text bold align="center">What I want Settings:  </Text>}>
    <Select
  label={`Upper Left`}
  settingsKey="upperLeftStat"
  options={[
    {name:"Steps"},
    {name:"Heart Rate"},
    {name: "Resting Heart Rate"},
    {name: "Calories"},
    {name: "Active Minutes"},
    {name: "Floors"},
    {name: "Activity Score"},
    {name: "Blank"}
  ]}
/>
    <Select
  label={`Upper Right`}
  settingsKey="upperRight"
  options={[
   {name:"Steps"},
    {name:"Heart Rate"},
    {name: "Resting Heart Rate"},
    {name: "Calories"},
    {name: "Active Minutes"},
    {name: "Floors"},
    {name: "Activity Score"},
    {name: "Blank"}
  ]}
/>
    <Text> Date Color: </Text>
    <ColorSelect
          settingsKey="dateColor"
          colors={colorItems}
        />
    <Text> Time Color:</Text>
    <ColorSelect
          settingsKey="timeColor"
          colors={colorItems}
        />
    <Text> Stats Color</Text> 
    <ColorSelect
          settingsKey="statsColor"
          colors={colorItems}
        />
  <Text> Icon Color</Text> 
    <ColorSelect
          settingsKey="iconColor"
          colors={colorItems}
        />
    
   </Section>
  
   

  <Section
   title={<Text bold align="center">Information</Text>}>
    <Link source="https://nolinks.com">Howald</Link> 
      
    <Text>© Open use </Text>
       
    </Section>
  
  
</Page>
     );
}

registerSettingsPage(mySettings);