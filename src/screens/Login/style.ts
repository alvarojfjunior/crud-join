import { CreateStyle, StyleProps } from "_hooks/utils/useStyle";

const createStyle: CreateStyle = (theme) => {
    const style = {
        container: {
            backgroundColor: theme.colors.background,
            flex: 1,
            justifyContent: 'center',
        },
        content: {
            margin: 30,
            borderWidth: 1,
            borderColor: theme.colors.disabled,
            borderRadius: 10,
            padding: 20
        },
        title: {
            textAlign: 'center',
            fontSize: 30,
            marginBottom: 20,
            marginTop: 20
        },
        input: {
            marginBottom: 10
        },
        button: {
            marginTop: 10,
            padding: 10
        },
    };

    return style as StyleProps<typeof style>;
};

export default createStyle;
