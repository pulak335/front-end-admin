type FileInputPropsType = {
    fileType: string;
    setFile: (value: any) => void;
};
export default function FileInput({ fileType, setFile }: FileInputPropsType) {
    const fileToBase64 = (file: any) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => setFile(reader.result), false);
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <input
            style={{ padding: '15px 14px',    background: '#fafafa',color: '#212121',borderRadius: '12px', border: '1px solid #EEE' }}
            accept={`${fileType}/*`}
            type="file"
            id="picture"
            onChange={(event: any) => {
                fileToBase64(event?.currentTarget?.files?.[0]);
            }}
        />
    );
}
