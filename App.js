
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Button from './src/componentes/Button'
import Display from './src/componentes/Display'


const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
}

export default class App extends Component {

  state = { ...initialState}
  /*state =  displayValue: '0'
  }*/

  addDigit = n =>{
    console.debug(typeof this.state.displayValue)//react-native log-android
   
   
   const clearDisplay = this.state.displayValue === '0'
    || this.state.clearDisplay //se eu colocar varios 0, nao vai acescentando

    if (n === '.' && !clearDisplay && this.state.displayValue.includes('.')){
      return
  }
// this.setState({displayValue: n})
    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + n
    this.setState({ displayValue, clearDisplay: false})

    if (n != '.'){
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[this.state.current] = newValue
      this.setState({ values })
    }
  }

  clearMemory = () => {
      this.setState({ ...initialState })
    //this.setState({displayValue: '0'})
  }

  setOperation = operation => {
      if (this.state.current === 0){//currente é o array 0 e 1, 0 significa que é o primeiro valor
        this.setState({operation, current: 1, clearDisplay:true })//se clicar em uma operacao, nao apaga numero dod isplay, mas diz que pode apagar quando apertar novo numero
      }else{
        const equals = operation === '='
        const values = [...this.state.values]

        try{
          values[0] =
            eval(`${values[0]} ${this.state.operation} ${values[1]}`)
        } catch (e){
          values[0] = this.state.values[0]//se o operador é apenas um igual, faz nada tipo "23 = 4" erro
        }

        values[1] = 0 
        this.setState({
          displayValue: `${values[0]}`,//interpolado para sempre ser uma string bug)
          operation: equals ? null : operation,//se nao apertei o =, muda pro operador novo queeu cliquei
          current: equals ? 0 : 1,//se apertei =, faz nada
          clearDisplay: !equals,
          values,
        })
      }
  }
//const values = [1,20]
//const operation = '+'
//eval(`${values[0]} ${operation} ${values[1]}`)
//21
//eval('23 + 2')
//25

  render() {
    return (
      <View style={styles.container}>
          <Display value={this.state.displayValue}></Display>
          
          <View style={styles.buttons}>
          <Button label='AC' triple onClick={this.clearMemory}></Button>
          <Button label='/' operation onClick={this.setOperation}></Button>
          <Button label='7' onClick={ this.addDigit}></Button>
          <Button label='8' onClick={ this.addDigit}></Button>
          <Button label='9' onClick={ this.addDigit}></Button>
          <Button label='*' operation onClick={ this.setOperation}></Button>
          <Button label='4' onClick={ this.addDigit}></Button>
          <Button label='5' onClick={ this.addDigit}></Button>
          <Button label='6' onClick={ this.addDigit}></Button>
          <Button label='-' operation onClick={ this.setOperation}></Button>
          <Button label='1' onClick={ this.addDigit}></Button>
          <Button label='2' onClick={ this.addDigit}></Button>
          <Button label='3' onClick={ this.addDigit}></Button>
          <Button label='+' operation onClick={ this.setOperation}></Button>
          <Button label='0' double onClick={ this.addDigit}></Button>
          <Button label='.' onClick={ this.addDigit}></Button>
          <Button label='=' operation onClick={ this.setOperation}></Button>   
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap', //quebrar linha
  }
});

//metodo 2 Tem que alterar no button pra funcionar
//<Button label='-' operation onClick={() => this.setOperation('-')}></Button>
//<Button label='1' onClick={() => this.addDigit(1)}></Button>