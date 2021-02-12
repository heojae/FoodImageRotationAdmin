import torch
import torch.nn as nn
from torchsummary import summary

from efficientnet_pytorch import EfficientNet


class FiraEfficientNet(nn.Module):
    def __init__(self, first_train=True):
        super(FiraEfficientNet, self).__init__()
        self.fc_input = 1280
        self.fc_output = 4

        if first_train:
            self.model = EfficientNet.from_pretrained('efficientnet-b0')
        else:
            self.model = EfficientNet.from_name('efficientnet-b0')

        self.model._fc = nn.Linear(in_features=self.fc_input, out_features=self.fc_output, bias=True)

    def forward(self, x):
        x = self.model(x)
        return x


if __name__ == "__main__":
    if torch.cuda.is_available():
        model = FiraEfficientNet(first_train=False).cuda()
        summary(model, (3, 224, 224), batch_size=10)
    else:
        model = FiraEfficientNet(first_train=False)
        summary(model, (3, 224, 224))

    # sample_input = torch.ones(1, 3, 224, 224)
    # with torch.no_grad():
    #     sample_output = model(sample_input)
