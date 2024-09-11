import FontSelector from '@/components/FontSelector.vue'
import { shallowMount } from '@vue/test-utils'

//clique ouvre le dropdown
//clique police select et ferme le dropdown
//dlique sur la meme police dans le dropdown rien ne change
//dans le comtenue dans le dropdown ai l apercus de les police


describe('FontSelector.vue', () => {
    const fonts = [
          'Arial' ,
          'Oswald' ,
          'Jost'  
    ];

    it('Should open the dropdown when clicked',async () => {
        const wrapper = shallowMount(FontSelector, {
            props: {
                selectedFont:'Arial',
                fonts,
                onSelectFont: jest.fn()
            }
        });
        const selectedFontDiv = wrapper.find('.selected-font');
        await selectedFontDiv.trigger('click');
        expect(wrapper.findAll('.font-option').length).toBe(3)
    })


    it('Should closes the dropdown after selecting a font',async () =>{
        const onSelectFont = jest.fn()
        const wrapper = shallowMount(FontSelector, {
            props: {
                selectedFont:'Arial',
                fonts,
                onSelectFont
            }
        });
        const selectedFontDiv = wrapper.find('.selected-font');
        await selectedFontDiv.trigger('click');

        const fontOption = wrapper.findAll('.font-option')[1];
        await fontOption.trigger('click');

        expect(onSelectFont).toHaveBeenCalledWith('Oswald')
        expect(wrapper.findAll('.font-option').length).toBe(0)
    })

    it('Should closes the dropdown after selecting a default font',async () =>{
        const onSelectFont = jest.fn()
        const wrapper = shallowMount(FontSelector, {
            props: {
                selectedFont:'Arial',
                fonts,
                onSelectFont
            }
        });
        const selectedFontDiv = wrapper.find('.selected-font');
        await selectedFontDiv.trigger('click');

        expect(wrapper.findAll('.font-option').length).toBe(3)

        await selectedFontDiv.trigger('click');
       
        expect(wrapper.findAll('.font-option').length).toBe(0)

        expect(selectedFontDiv.text()).toEqual('Arial')
    })


    it('Should apply the font in the dropdown',async () =>{
        const onSelectFont = jest.fn()
        const wrapper = shallowMount(FontSelector, {
            props: {
                selectedFont:'Arial',
                fonts,
                onSelectFont
            }
        });
        const selectedFontDiv = wrapper.find('.selected-font');
        await selectedFontDiv.trigger('click');

        const fontOptions =  wrapper.findAll('.font-option')
        expect(fontOptions.length).toBe(3)

        const styles = window.getComputedStyle(fontOptions[0].element)
        expect(styles.fontFamily).toContain('')


    })
    
})