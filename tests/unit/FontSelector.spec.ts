import FontSelector from '@/components/FontSelector.vue';
import { shallowMount } from '@vue/test-utils';

describe('FontSelector', () =>{
    const fonts = ['Arial', 'Helvetica', 'Times New Roman'];

    it('Should renders the selected font', () => {
        const wrapper = shallowMount(FontSelector, {
            props: {
                fonts,
                selectedFont:"Arial",
                onSelectFont: jest.fn()
            }
        });
        const  selectedFontDiv = wrapper.find('.selected-font');
        expect(selectedFontDiv.text()).toBe('Arial')
    });

    it('Should open the dropdown when clicked', async () => {
        const wrapper = shallowMount(FontSelector, {
            props: {
                fonts,
                selectedFont:"Arial",
                onSelectFont: jest.fn()
            }
        });
        const seletedFontDiv = wrapper.find('.selected-font');
        await seletedFontDiv.trigger('click');
        expect(wrapper.findAll('.font-option').length).toBe(3)
    });
    it('Should close the dropdown after selecting a font', async () => {
        const onSelectFont = jest.fn();
        const wrapper = shallowMount(FontSelector, {
            props: {
                fonts,
                selectedFont:"Arial",
                onSelectFont
            } 
        });
        const selectedFontDiv = wrapper.find('.selected-font');
        await selectedFontDiv.trigger('click');

        const fontOption = wrapper.findAll('.font-option')[1];
        await fontOption.trigger('click');

        expect(onSelectFont).toHaveBeenCalledWith('Helvetica');  

        expect(wrapper.findAll('.color-option').length).toBe(0);
    })
    it('Should close the dropdown is the same font', async () => {
        const onSelectFont = jest.fn();
        const wrapper = shallowMount(FontSelector, {
            props: {
                fonts,
                selectedFont:"Arial",
                onSelectFont
            } 
        });
        const selectedFontDiv = wrapper.find('.selected-font');
        await selectedFontDiv.trigger('click');

        const fontOptions = wrapper.findAll('.font-option')[0];
        await fontOptions.trigger('click');

        expect(onSelectFont).not.toHaveBeenCalledWith();  

        expect(wrapper.findAll('.color-option').length).toBe(0);
    })
    it('Should applies the font in a the dropdown', async () => {
        const onSelectFont = jest.fn();
        const wrapper = shallowMount(FontSelector, {
            props: {
                fonts,
                selectedFont:"Helvetica",
                onSelectFont
            }
        });
        const selectedFontDiv = wrapper.find('.selected-font');
        await selectedFontDiv.trigger('click');
        

        const fontOptions = wrapper.findAll('.font-option');

        const styles = window.getComputedStyle(fontOptions[1].element);

        expect(fontOptions.length).toBe(3);
        
        expect(styles.fontFamily).toContain('Helvetica')
    })
});


// quand je click sur la police ça ouvre toutes les polices,
// quand je click sur la meme police, il ne se passe rien mais le menu se ferme bien,
// le menu dropdown avec la bonne police