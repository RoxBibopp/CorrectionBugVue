import ColorPicker from "@/components/ColorPicker.vue";
import { shallowMount } from '@vue/test-utils';

describe('ColorPicker.vue', () =>{
    const colors = [
        {value: 'rgb(255, 0, 0)',label:'red'},
        {value: 'rgb(0, 255, 0)',label:'green'},
        {value: 'rgb(0, 0, 255)',label:'blue'}
    ];

    it('Should renders the selected color', () => {
        const wrapper = shallowMount(ColorPicker, {
            props: {
                selectedColor: "rgb(255, 0, 0)",
                colors,
                onSelectColor: jest.fn()
            }
        }) ;
        const selectedColorDiv = wrapper.find('.selected-color');
        expect(selectedColorDiv.attributes('style')).toContain("background-color: rgb(255, 0, 0);");
    });

    it('Should open the dropdown when clicked', async () => {
        const wrapper = shallowMount(ColorPicker, {
            props: {
                selectedColor: "rgb(255, 0, 0)",
                colors,
                onSelectColor: jest.fn()
            }
    });
    const selectedColorDiv = wrapper.find(".selected-color");
    await selectedColorDiv.trigger('click');
    expect(wrapper.findAll('.color-option').length).toBe(3);
})
it('Should close the dropdown after selecting a color', async () => {
    const onSelectColor = jest.fn(); 
    const wrapper = shallowMount(ColorPicker, {
        props: {
            selectedColor: 'rgb(255, 0, 0)',
            colors,
            onSelectColor 
        }
    });
    
    const selectedColorDiv = wrapper.find('.selected-color');
    await selectedColorDiv.trigger('click');
    
    const colorOption = wrapper.findAll('.color-option')[1]; 
    await colorOption.trigger('click');
    
    
    expect(onSelectColor).toHaveBeenCalledWith('rgb(0, 255, 0)');  

    expect(wrapper.findAll('.color-option').length).toBe(0);
});
});

