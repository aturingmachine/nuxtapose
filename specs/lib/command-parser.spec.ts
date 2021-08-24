import { CommandParser } from '../../src/lib/command-parser'
import { Target } from '../../src/models'

describe('Command Parser', () => {
  describe('Component', () => {
    it('should return Target.Component for command component', () => {
      const result = CommandParser.parseTarget('component')

      expect(result).toEqual(Target.Component)
    })

    it('should return Target.Component for command c', () => {
      const result = CommandParser.parseTarget('c')

      expect(result).toEqual(Target.Component)
    })
  })

  describe('Service', () => {
    it('should return Target.Service for command service', () => {
      const result = CommandParser.parseTarget('service')

      expect(result).toEqual(Target.Service)
    })

    it('should return Target.Service for command s', () => {
      const result = CommandParser.parseTarget('s')

      expect(result).toEqual(Target.Service)
    })
  })

  describe('Middleware', () => {
    it('should return Target.Middleware for command middleware', () => {
      const result = CommandParser.parseTarget('middleware')

      expect(result).toEqual(Target.Middleware)
    })

    it('should return Target.Middleware for command m', () => {
      const result = CommandParser.parseTarget('m')

      expect(result).toEqual(Target.Middleware)
    })
  })

  describe('Page', () => {
    it('should return Target.Page for command page', () => {
      const result = CommandParser.parseTarget('page')

      expect(result).toEqual(Target.Page)
    })

    it('should return Target.Page for command p', () => {
      const result = CommandParser.parseTarget('p')

      expect(result).toEqual(Target.Page)
    })
  })

  describe('Layout', () => {
    it('should return Target.Layout for command layout', () => {
      const result = CommandParser.parseTarget('layout')

      expect(result).toEqual(Target.Layout)
    })

    it('should return Target.Layout for command l', () => {
      const result = CommandParser.parseTarget('l')

      expect(result).toEqual(Target.Layout)
    })
  })

  describe('Vuex', () => {
    it('should return Target.Vuex for command vuex', () => {
      const result = CommandParser.parseTarget('vuex')

      expect(result).toEqual(Target.Vuex)
    })

    it('should return Target.Vuex for command v', () => {
      const result = CommandParser.parseTarget('v')

      expect(result).toEqual(Target.Vuex)
    })
  })

  describe('Module', () => {
    it('should return Target.Module for command module', () => {
      const result = CommandParser.parseTarget('module')

      expect(result).toEqual(Target.Module)
    })

    it('should return Target.Module for command mod', () => {
      const result = CommandParser.parseTarget('mod')

      expect(result).toEqual(Target.Module)
    })
  })

  describe('Error', () => {
    it('should throw an error if the command is not a valid matcher', () => {
      expect(() => CommandParser.parseTarget('something else')).toThrow(
        new Error(
          'something else is not a valid command for nuxtapose. Run nuxtapose help to see available commands.'
        )
      )
    })
  })
})
